/*    Name:             Mark Buster
      Date:             11-13-2024
      File Description: This is a file containing Express.js setup and endpoints 
                        that connect a local database. It is a backend API service 
                        for Horrorific's community forum page. 
*/

const express = require("express");
const multer = require("multer");
const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const cors = require("cors");
const app = express();
app.use(cors());

const PORT = 3000;
const db = new sqlite3.Database("./community-forum.db");

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "html", "index.html"));
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));


/**
 * Configures and initializes Multer storage for file uploads.
 * @type {Object}
 */
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

/**
 * Configures Multer upload settings including file filtering.
 * @type {Object}
 */
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png/;
    const extName = fileTypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimeType = fileTypes.test(file.mimetype);
    if (extName && mimeType) {
      cb(null, true);
    } else {
      cb(new Error("Error: Images only!"));
    }
  },
});

/**
 * Initialize tables if they don't exist
 */
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS Users (
    user_id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL UNIQUE
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS Posts (
    post_id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    content TEXT NOT NULL,
    date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    image_path TEXT,
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS Comments (
    comment_id INTEGER PRIMARY KEY AUTOINCREMENT,
    post_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    comment_text TEXT NOT NULL,
    date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (post_id) REFERENCES Posts(post_id),
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS Images (
    image_id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    post_id INTEGER NOT NULL,
    comment_id INTEGER,
    image_path TEXT NOT NULL,
    image_text TEXT,
    date_uploaded TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(user_id),
    FOREIGN KEY (post_id) REFERENCES Posts(post_id),
    FOREIGN KEY (comment_id) REFERENCES Comments(comment_id)
  )`);
});

/**
 * GET endpoint to retrieve all posts with their associated data.
 * @route GET /posts
 * @returns {Object} JSON object containing array of posts with comments
 */
app.get("/posts", (req, res) => {
  console.log("Fetching posts...");
  const query = `
    SELECT 
      p.post_id,
      p.content,
      p.date_created as post_date,
      p.image_path,
      u.username,
      COUNT(DISTINCT c.comment_id) as comment_count,
      json_group_array(
        json_object(
          'comment_id', c.comment_id,
          'comment_text', c.comment_text,
          'date_created', c.date_created,
          'username', cu.username
        )  
      ) as comments
    FROM Posts p
    LEFT JOIN Users u ON p.user_id = u.user_id
    LEFT JOIN Comments c ON p.post_id = c.post_id
    LEFT JOIN Users cu ON c.user_id = cu.user_id
    GROUP BY p.post_id
    ORDER BY p.date_created DESC`;

  db.all(query, [], (err, rows) => {
    if (err) {
      console.error("Database error:", err.message);
      return res.status(500).json({ error: err.message });
    }

    try {
      const processedRows = rows.map((row) => ({
        ...row,
        comments: JSON.parse(row.comments).filter(
          (comment) => comment !== null
        ),
        image_path: row.image_path ? `/public/uploads/${row.image_path}` : null,
      }));

      console.log("Sending posts:", processedRows);
      res.json({ posts: processedRows });
    } catch (error) {
      console.error("Processing error:", error);
      res.status(500).json({ error: "Error processing posts data" });
    }
  });
});

/**
 * POST endpoint to create a new post.
 * Handles both text content and optional image upload.
 * @route POST /posts
 * @param {Object} req.body - Request body containing username and content
 * @param {string} req.body.username - Username of post author
 * @param {string} req.body.content - Post content
 * @param {File} [req.file] - Optional image file
 * @returns {Object} JSON object containing the created post data
 */
app.post("/posts", upload.single("image"), (req, res) => {
  const { username, content } = req.body;
  const image_path = req.file ? req.file.filename : null;

  db.get(
    `SELECT user_id FROM Users WHERE username = ?`,
    [username],
    (err, row) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      const createPost = (userId) => {
        db.run(
          `INSERT INTO Posts (user_id, content, image_path) VALUES (?, ?, ?)`,
          [userId, content, image_path],
          function (err) {
            if (err) {
              return res.status(500).json({ error: err.message });
            }
            
            res.json({
              post_id: this.lastID,
              username,
              content,
              image_path,
              post_date: new Date().toISOString(),
              comment_count: 0,
              comments: [],
            });
          }
        );
      };

      if (row) {
        createPost(row.user_id);
      } else {
        db.run(
          `INSERT INTO Users (username) VALUES (?)`,
          [username],
          function (err) {
            if (err) {
              return res.status(500).json({ error: err.message });
            }
            createPost(this.lastID);
          }
        );
      }
    }
  );
});

/**
 * POST endpoint to add a comment to a post.
 * @route POST /comments
 * @param {Object} req.body - Request body
 * @param {string} req.body.username - Username of commenter
 * @param {number} req.body.post_id - ID of post being commented on
 * @param {string} req.body.comment_text - Content of the comment
 * @returns {Object} JSON object containing the created comment ID
 */
app.post("/comments", (req, res) => {
  const { username, post_id, comment_text } = req.body;

  db.get(
    `SELECT user_id FROM Users WHERE username = ?`,
    [username],
    (err, row) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      if (row) {
        // Reuse user-id if same username is detected
        db.run(
          `INSERT INTO Comments (post_id, user_id, comment_text) VALUES (?, ?, ?)`,
          [post_id, row.user_id, comment_text],
          function (err) {
            if (err) {
              return res.status(500).json({ error: err.message });
            }
            res.json({ comment_id: this.lastID });
          }
        );
      } else {
        return res.status(404).json({ error: "User not found" });
      }
    }
  );
});

/**
 * POST endpoint to handle image uploads.
 * @route POST /upload-image
 * @param {Object} req.body - Request body
 * @param {number} req.body.user_id - ID of user uploading image
 * @param {number} req.body.post_id - ID of associated post
 * @param {number} [req.body.comment_id] - Optional ID of associated comment
 * @param {string} [req.body.image_text] - Optional text description of image
 * @param {File} req.file - The uploaded image file
 * @returns {Object} JSON object containing the created image ID
 */
app.post("/upload-image", upload.single("image"), (req, res) => {
  const { user_id, post_id, comment_id, image_text } = req.body;
  const image_path = `/uploads/${req.file.filename}`;

  db.run(
    `INSERT INTO Images (user_id, post_id, comment_id, image_path, image_text) VALUES (?, ?, ?, ?, ?)`,
    [user_id, post_id, comment_id || null, image_path, image_text],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ image_id: this.lastID });
    }
  );
});

/**
* Starts the Express server and listens for incoming requests.
* @param {number} PORT - The port number to listen on (3000)
* @param {Function} callback - Function called when server starts successfully
* @listens {http://localhost:3000}
*/
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
