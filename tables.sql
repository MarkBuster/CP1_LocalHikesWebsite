/*  Name:             Mark Buster
    Date:             11-13-2024
    File Description: This file includes CREATE statements used in the creation of
                      Horrorific's database. The app.js file should create the tables
                      in a circumstance where one is dropped or missing. These are extra
                      insurance.           
*/

-- Users Table
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
  comment_id INTEGER,
  image_path TEXT NOT NULL,
  image_text TEXT,
  date_uploaded TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES Users(user_id),
  FOREIGN KEY (post_id) REFERENCES Posts(post_id),
  FOREIGN KEY (comment_id) REFERENCES Comments(comment_id)
);
