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
    qs("button").addEventListener("click", postMessage);
  }

  /**
   * adds a message to chat.
   */
  function postMessage() {
    //making article class
    let article = document.createElement("article");
    article.classList.add("message");

    //vars to hold each input
    let dateVal = id("date").value;
    let nameVal = id("name").value;
    let inputVal = id("entry").value;

    //making new elements
    let h3 = document.createElement("h3");
    let p = document.createElement("p");
    h3.textContent = "Name " + nameVal + "\nDate: " + dateVal;
    p.textContent = " " + inputVal;

    //add the post to My posts
    article.appendChild(h3);
    article.appendChild(p);
    id("messages").appendChild(article);

    //clear original input boxes
    id("date").value = "";
    id("name").value = "";
    id("entry").value = "";

    article.addEventListener("dblclick", function () {
      article.remove();
    });
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
