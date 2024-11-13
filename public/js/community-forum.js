/*  Name:             Mark Buster
      Date:             10-30-2024
      File Description: This is the javascript file and will
                        be the control center for all interactive elements of
                        this project. It will work seemlessly with css and html files
                        to create a scary and professional experience.
*/
"use strict";

/**
 * Blank function to keep funcitons secure from outside files.
 */
(function () {
  window.addEventListener("load", init);

  function init() {
    qs("button#post-btn").addEventListener("click", postMessage);
    loadPosts();
  }

  /**
   * Generates a formatted date string.
   * @returns {string} - The current date in "MM/DD/YYYY" format.
   */
  function getCurrentDate() {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, "0");
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const year = now.getFullYear();
    return `${month}-${day}-${year}`;
  }

  /**
   * This function loads all stored posts/data in the database.
   */
  function loadPosts() {
    fetch("/posts")
      .then((response) => response.json())
      .then((data) => {
        data.forEach((post) => displayPost(post));
      })
      .catch((error) => {
        console.error("Error loading posts:", error);
        handleError("Failed to load posts. Please try again later.");
      });
  }

  /**
   * Takes input from user of name, date and message then displays the message a field below.
   */
  function postMessage() {
    const ARTICLE = document.createElement("article");
    const HEADER = document.createElement("header");
    const H3 = document.createElement("h3");
    const P = document.createElement("p");
    const COMMENTS_SECTION = document.createElement("div");
    const COMMENT_INPUT = document.createElement("input");
    const COMMENT_BTN = document.createElement("button");

    const DATE_VAL = getCurrentDate();
    const NAME_VAL = id("name").value;
    const INPUT_VAL = id("entry").value;
    const IMAGE_PATH = id("image").files[0];

    // Prepare FormData to send the data to the server
    const formData = new FormData();
    formData.append("name", NAME_VAL);
    formData.append("date", DATE_VAL);
    formData.append("message", INPUT_VAL);
    if (IMAGE_PATH) {
      formData.append("image", IMAGE_PATH);
    }

    // Send the form data to the server
    fetch("/post", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Post saved:", data);
        displayPost(data);
      })
      .catch((error) => {
        console.error("Error posting message:", error);
        handleError("Failed to post your message. Please try again.");
      });

    //clear inputs
    id("name").value = "";
    id("entry").value = "";
    id("image").value = "";
  }

  /**
   * Display the newly created post (either after sending or immediately)
   */
  function displayPost(postData) {
    const ARTICLE = document.createElement("article");
    const HEADER = document.createElement("header");
    const H3 = document.createElement("h3");
    const P = document.createElement("p");
    const IMAGE = document.createElement("img");
    const COMMENTS_SECTION = document.createElement("div");
    const COMMENT_INPUT = document.createElement("input");
    const COMMENT_BTN = document.createElement("button");

    H3.innerHTML = `Name: ${postData.name} <br> Date: ${postData.date}`;
    P.textContent = postData.message;

    // Display image if there is one
    if (postData.imagePath) {
      IMAGE.src = postData.imagePath;
      IMAGE.alt = "Post Image";
      ARTICLE.appendChild(IMAGE);
    }

    // Set up comments section
    COMMENT_INPUT.placeholder = "Add a comment...";
    COMMENT_BTN.textContent = "Submit Comment";
    COMMENT_BTN.addEventListener("click", () =>
      addComment(COMMENTS_SECTION, COMMENT_INPUT.value)
    );

    const SHOW_COMMENTS_BTN = document.createElement("button");
    SHOW_COMMENTS_BTN.textContent = "Show Comments";
    SHOW_COMMENTS_BTN.addEventListener("click", () => {
      COMMENTS_SECTION.classList.toggle("hidden");
      SHOW_COMMENTS_BTN.textContent = COMMENTS_SECTION.classList.contains(
        "hidden"
      )
        ? "Show Comments"
        : "Hide Comments";
    });

    HEADER.appendChild(H3);
    HEADER.appendChild(SHOW_COMMENTS_BTN);
    COMMENTS_SECTION.appendChild(COMMENT_INPUT);
    COMMENTS_SECTION.appendChild(COMMENT_BTN);
    ARTICLE.appendChild(HEADER);
    ARTICLE.appendChild(P);
    ARTICLE.appendChild(COMMENTS_SECTION);
    id("posts").appendChild(ARTICLE);
  }

  /**
   * Adds a comment to the specified comment section.
   * @param {HTMLElement} commentsSection - The comments container element.
   * @param {string} commentText - The text of the comment to add.
   */
  function addComment(commentsSection, commentText) {
    if (commentText.trim() === "") return; // Do nothing if input is empty

    const COMMENT = document.createElement("p");
    COMMENT.classList.add("comment");
    COMMENT.textContent = commentText;

    // Insert the new comment at the top of the list
    commentsSection.insertBefore(COMMENT, commentsSection.children[2]);

    // Clear the comment input box
    commentsSection.querySelector(".comment-input").value = "";
  }

  /**
   * Helper function to print a custom error message to the user.
   * @param {*} message
   */
  function handleError(message) {
    const ERROR_MESSAGE_ELEMENT = document.getElementById("error-message");
    ERROR_MESSAGE_ELEMENT.textContent = message;
    ERROR_MESSAGE_ELEMENT.classList.remove("hidden");
  }

  /**
   * Returns the element that has the ID attribute with the specified value.
   * @param {string} name - element ID.
   * @returns {object} - DOM object associated with id.
   */
  function id(id) {
    return document.getElementById(id);
  }

  /**
   * Returns first element matching selector.
   * @param {string} selector - CSS query selector.
   * @returns {object} - DOM object associated selector.
   */
  function qs(selector) {
    return document.querySelector(selector);
  }
})();
