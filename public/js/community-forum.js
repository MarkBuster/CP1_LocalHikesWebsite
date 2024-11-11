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
  }

  /**
   * Generates a formatted date string.
   * @returns {string} - The current date in "MM/DD/YYYY" format.
   */
  function getCurrentDate() {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = now.getFullYear();
    return `${month}-${day}-${year}`;
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

   // Set up post
   ARTICLE.classList.add("post");
   HEADER.classList.add("post-header");
   H3.classList.add("nameInfo");
   COMMENTS_SECTION.classList.add("comments-section", "hidden");
   COMMENT_INPUT.classList.add("comment-input");
   COMMENT_BTN.classList.add("comment-btn");

    H3.innerHTML = "Name " + NAME_VAL + "<br>Date: " + DATE_VAL;
    P.textContent = " " + INPUT_VAL;

    // Set up comments section
    COMMENT_INPUT.placeholder = "Add a comment...";
    COMMENT_BTN.textContent = "Submit Comment";
    COMMENT_BTN.addEventListener("click", () => addComment(COMMENTS_SECTION, COMMENT_INPUT.value));

    const SHOW_COMMENTS_BTN = document.createElement("button");
    SHOW_COMMENTS_BTN.textContent = "Show Comments";
    SHOW_COMMENTS_BTN.addEventListener("click", () => {
      COMMENTS_SECTION.classList.toggle("hidden");
      SHOW_COMMENTS_BTN.textContent = COMMENTS_SECTION.classList.contains("hidden") ? "Show Comments" : "Hide Comments";
    });

    HEADER.appendChild(H3);
    HEADER.appendChild(SHOW_COMMENTS_BTN);
    COMMENTS_SECTION.appendChild(COMMENT_INPUT);
    COMMENTS_SECTION.appendChild(COMMENT_BTN);
    ARTICLE.appendChild(HEADER);
    ARTICLE.appendChild(P);
    ARTICLE.appendChild(COMMENTS_SECTION);
    id("posts").appendChild(ARTICLE);


    //clear inputs
    id("name").value = "";
    id("entry").value = "";
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
