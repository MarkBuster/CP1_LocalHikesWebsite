-- This file should include any CREATE statements you used in your database. This file does not need to include header documentation (this is the only exception - all other files must include documentation).

-- Users Table (optional: only needed if user data is separate)
CREATE TABLE IF NOT EXISTS Users (
  user_id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT NOT NULL UNIQUE
);

-- Posts Table
CREATE TABLE IF NOT EXISTS Posts (
  post_id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  content TEXT NOT NULL,
  date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  image_path TEXT,
  FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

-- Comments Table
CREATE TABLE IF NOT EXISTS Comments (
  comment_id INTEGER PRIMARY KEY AUTOINCREMENT,
  post_id INTEGER NOT NULL,
  user_id INTEGER NOT NULL,
  comment_text TEXT NOT NULL,
  date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (post_id) REFERENCES Posts(post_id),
  FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

-- Images Table
CREATE TABLE IF NOT EXISTS Images (
  image_id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  post_id INTEGER NOT NULL,
  comment_id INTEGER,  -- Optional: can be NULL if image is associated only with a post
  image_path TEXT NOT NULL,  -- Path to image file
  image_text TEXT,  -- Optional descriptive text for the image
  date_uploaded TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES Users(user_id),
  FOREIGN KEY (post_id) REFERENCES Posts(post_id),
  FOREIGN KEY (comment_id) REFERENCES Comments(comment_id)
);
