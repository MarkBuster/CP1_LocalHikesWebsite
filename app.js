//This file should contain the Node.js service that is your back end API.

const express = require("express");
const multer = require("multer");
const sqlite3 = require("sqlite3").verbose();
const path = require("path");
const cors = require("cors");
const app = express();

app.use(cors()); // Enable CORS for all routes

const PORT = 3000;
const db = new sqlite3.Database("./community-forum.db");

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "html", "index.html"));
});

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public")); // Serve static files (e.g., images)

// Update image storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/uploads"); // Make sure this folder exists
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

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

// Initialize tables if they don't exist
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

// Routes
// Update the posts endpoint to return all necessary data
app.get("/posts", (req, res) => {
  console.log("Fetching posts..."); // Debug log
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

// Update the posts endpoint to return the created post data
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
            // Return more complete data about the created post
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

// function createPost(userId) {
//   db.run(
//     `INSERT INTO Posts (user_id, content, image_path) VALUES (?, ?, ?)`,
//     [userId, content, image_path],
//     function (err) {
//       if (err) {
//         return res.status(500).json({ error: err.message });
//       }
//       res.json({ post_id: this.lastID });
//     }
//   );
// }

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
        // Use the user_id from the existing user
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

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
