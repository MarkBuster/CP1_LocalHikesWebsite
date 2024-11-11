//This file should contain the Node.js service that is your back end API.

const express = require('express');
const multer = require('multer');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const PORT = 3000;
const db = new sqlite3.Database('./community_forum.db');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));  // Serve static files (e.g., images)

// Configure Multer for image upload handling
const storage = multer.diskStorage({
  destination: './public/uploads',
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ 
  storage, 
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png/;
    const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimeType = fileTypes.test(file.mimetype);

    if (extName && mimeType) {
      cb(null, true);
    } else {
      cb("Error: Images only!");
    }
  }
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
app.get('/posts', (req, res) => {
  db.all(`SELECT * FROM Posts`, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

app.post('/posts', upload.single('image'), (req, res) => {
  const { user_id, content } = req.body;
  const image_path = req.file ? `/uploads/${req.file.filename}` : null;

  db.run(`INSERT INTO Posts (user_id, content, image_path) VALUES (?, ?, ?)`,
    [user_id, content, image_path],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ post_id: this.lastID });
    }
  );
});

app.post('/comments', (req, res) => {
  const { post_id, user_id, comment_text } = req.body;

  db.run(`INSERT INTO Comments (post_id, user_id, comment_text) VALUES (?, ?, ?)`,
    [post_id, user_id, comment_text],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ comment_id: this.lastID });
    }
  );
});

app.post('/upload-image', upload.single('image'), (req, res) => {
  const { user_id, post_id, comment_id, image_text } = req.body;
  const image_path = `/uploads/${req.file.filename}`;

  db.run(`INSERT INTO Images (user_id, post_id, comment_id, image_path, image_text) VALUES (?, ?, ?, ?, ?)`,
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
