/*  Name:             Mark Buster
      Date:             10-30-2024
      File Description: This is the javascript file and will
                        be the control center for all interactive elements of
                        this project. It will work seemlessly with css and html files
                        to create a scary and professional experience.
*/
"use strict";

(function () {
  window.addEventListener("load", init);

  function init() {
    qs("button#post-btn").addEventListener("click", postMessage);
    loadPosts();
  }

  function loadPosts() {
    fetch("http://localhost:3000/posts")
      .then((response) => {
        if (!response.ok) {
          return response.json().then(err => Promise.reject(err));
        }
        return response.json();
      })
      .then((data) => {
        console.log("Received data:", data); // Add this log
        // Clear existing posts first
        id("posts").innerHTML =
          '<h4><u>Share with us your movie reviews, scary stories or create friendships.</u></h4><div id="error-message" class="hidden"></div>';
        
        // Check if data.posts exists
        if (data.posts && Array.isArray(data.posts)) {
          data.posts.forEach((post) => displayPost(post));
        } else {
          console.error("Unexpected data format:", data);
          handleError("Received unexpected data format from server");
        }
      })
      .catch((error) => {
        console.error("Error loading posts:", error);
        handleError("Failed to load posts. Please try again later.");
      });
  }

  function postMessage() {
    const nameVal = id("name").value.trim();
    const messageVal = id("entry").value.trim();
    const imageFile = id("image").files[0];

    if (!nameVal || !messageVal) {
      handleError("Please fill in both name and message fields.");
      return;
    }

    const formData = new FormData();
    formData.append("username", nameVal);
    formData.append("content", messageVal);
    if (imageFile) {
      formData.append("image", imageFile);
    }

    fetch("http://localhost:3000/posts", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Post saved:", data);
        loadPosts(); // Reload all posts instead of trying to display just the new one
        // Clear inputs
        id("name").value = "";
        id("entry").value = "";
        id("image").value = "";
      })
      .catch((error) => {
        console.error("Error posting message:", error);
        handleError("Failed to post your message. Please try again.");
      });
  }

  function displayPost(postData) {
    console.log("Displaying post data:", postData); // Debug log

    const ARTICLE = document.createElement("article");
    const HEADER = document.createElement("header");
    const H3 = document.createElement("h3");
    const P = document.createElement("p");
    const COMMENTS_SECTION = document.createElement("div");

    // Set post date and content
    const postDate = new Date(postData.post_date);
    const formattedDate = `${String(postDate.getMonth() + 1).padStart(
      2,
      "0"
    )}-${String(postDate.getDate()).padStart(
      2,
      "0"
    )}-${postDate.getFullYear()}`;

    H3.innerHTML = `Name: ${ postData.username || "Anonymous" } <br> Date: ${formattedDate}`;
    P.textContent = postData.content;

    // Add image if exists
    if (postData.image_path) {
      const IMAGE = document.createElement("img");
      IMAGE.src = postData.image_path;
      IMAGE.alt = "Post Image";
      IMAGE.onerror = function () {
        console.error("Failed to load image:", postData.image_path);
        this.style.display = "none";
      };
      ARTICLE.appendChild(IMAGE);
    }

// Create comments section
COMMENTS_SECTION.classList.add("comments-section");
    
// Create comments container that will be toggled
const COMMENTS_CONTAINER = document.createElement("div");
COMMENTS_CONTAINER.classList.add("comments-container", "hidden");

const SHOW_COMMENTS_BTN = document.createElement("button");
SHOW_COMMENTS_BTN.textContent = `Show Comments (${postData.comment_count || 0})`;
SHOW_COMMENTS_BTN.addEventListener("click", () => {
  COMMENTS_CONTAINER.classList.toggle("hidden");
  SHOW_COMMENTS_BTN.textContent = COMMENTS_CONTAINER.classList.contains("hidden")
    ? `Show Comments (${postData.comment_count || 0})`
    : "Hide Comments";
});

// Add existing comments if any
if (postData.comments && postData.comments.length > 0) {
  postData.comments.forEach((comment) => {
    const COMMENT = document.createElement("div");
    COMMENT.classList.add("comment");
    const commentDate = new Date(comment.date_created);
    const formattedCommentDate = `${String(commentDate.getMonth() + 1).padStart(
      2,
      "0"
    )}-${String(commentDate.getDate()).padStart(
      2,
      "0"
    )}-${commentDate.getFullYear()}`;
    
    COMMENT.innerHTML = `
      <strong>${comment.username || 'Anonymous'}</strong>
      <span class="comment-date">${formattedCommentDate}</span>
      <p>${comment.comment_text}</p>
    `;
    COMMENTS_CONTAINER.appendChild(COMMENT);
  });
}

// Add comment form
const COMMENT_FORM = document.createElement("div");
COMMENT_FORM.classList.add("comment-form");
COMMENT_FORM.innerHTML = `
  <input type="text" placeholder="Add a comment..." class="comment-input">
  <button class="comment-btn">Submit</button>
`;

// Handle comment submission
const commentBtn = COMMENT_FORM.querySelector(".comment-btn");
commentBtn.addEventListener("click", () => {
  const commentText = COMMENT_FORM.querySelector(".comment-input").value.trim();
  if (!commentText) return;

      fetch("http://localhost:3000/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: id("name").value || "Anonymous",
          post_id: postData.post_id,
          comment_text: commentText,
        }),
      })
        .then((response) => response.json())
        .then(() => {
          loadPosts(); // Reload all posts to show new comment
        })
        .catch((error) => {
          console.error("Error posting comment:", error);
          handleError("Failed to post comment. Please try again.");
        });
    });

    // Assemble post
    HEADER.appendChild(H3);
    ARTICLE.appendChild(HEADER);
    ARTICLE.appendChild(P);
    COMMENTS_SECTION.appendChild(SHOW_COMMENTS_BTN);
    COMMENTS_SECTION.appendChild(COMMENT_FORM);
    COMMENTS_SECTION.appendChild(COMMENTS_CONTAINER);
    ARTICLE.appendChild(COMMENTS_SECTION);
    id("posts").appendChild(ARTICLE);
  }

  function handleError(message) {
    const errorElement = id("error-message");
    errorElement.textContent = message;
    errorElement.classList.remove("hidden");
    setTimeout(() => {
      errorElement.classList.add("hidden");
    }, 5000);
  }

  function id(idName) {
    return document.getElementById(idName);
  }

  function qs(selector) {
    return document.querySelector(selector);
  }
})();
