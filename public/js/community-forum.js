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
    qs("button").addEventListener("click", postMessage);
  }

  /**
   * Takes input from user of name, date and message then displays the message a field below.
   */
  function postMessage() {
    const ARTICLE = document.createElement("article");
    const H3 = document.createElement("h3");
    const P = document.createElement("p");
    const DATE_VAL = id("date").value;
    const NAME_VAL = id("name").value;
    const INPUT_VAL = id("entry").value;

   ARTICLE.classList.add("message");
    H3.classList.add("nameInfo");

    H3.textContent = "Name " + NAME_VAL + "\nDate: " + DATE_VAL;
    P.textContent = " " + INPUT_VAL;

    ARTICLE.appendChild(H3);
    ARTICLE.appendChild(P);
    id("messages").appendChild(ARTICLE);

    //clear inputs
    id("date").value = "";
    id("name").value = "";
    id("entry").value = "";
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
