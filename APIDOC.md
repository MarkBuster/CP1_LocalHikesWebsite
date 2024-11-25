# Horrorific Community-Forum API Documentation

This API handles posts, comments, and images for our horror community forum.

## Endpoints

### GET /posts
Gets all posts and their comments from the database.

**Returns:**
```
//json
{
  "posts": [
    {
      "post_id": 1,
      "content": "Post message here",
      "username": "HorrorFan",
      "post_date": "2024-11-14 00:31:48",
      "image_path": "/uploads/image.jpg",
      "comment_count": 2,
      "comments": [
        {
          "comment_text": "Comment here",
          "username": "Commenter",
          "date_created": "2024-11-14"
        }
      ]
    }
  ]
}
```

### POST /posts
Create a new post, with optional image upload.

**What to send:**

- username
- content
- image (optional) - must be jpg, jpeg, or png

Example:
```
const formData = new FormData();
formData.append("username", "HorrorFan");
formData.append("content", "Great horror movie!");
formData.append("image", imageFile);
```

**Returns:**
```
//json object
{
  "post_id": 24,
  "username": "HorrorFan99",
  "content": "Just watched The Exorcist for the first time!",
  "image_path": "/uploads/1731547689123.jpg",
  "post_date": "2024-11-14T01:15:23.456Z",
  "comment_count": 0,
  "comments": []
}
  ```

### POST /comments

Add a comment to an existing post.
**What to send:**

```
//json object
{
  "username": "HorrorFan",
  "post_id": 1,
  "comment_text": "Great post!"
}
```

Note: The username must already exist in the database.

**Returns**:
```
//json object
{
  "comment_id": 4
}
```

### POST /upload-image

Upload an image separately from posts.

**What to send:**

- image file
- user_id
- post_id
- comment_id (optional)
- image_text (optional)

**Returns:**
```
//json object
{
  "image_id": 1
}
```

### Common Errors

- 500: Something went wrong with the server/database
- 400: Missing required information
- 404: User not found

## Notes

- Images are stored in the /public/uploads folder
- All dates are returned in YYYY-MM-DD HH:MM:SS format
- Comments require an existing username

