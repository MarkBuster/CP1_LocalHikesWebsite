# Creative Project 1 Project Specification
## Overview
For your first Creative Project, you will use what we're learning about HTML and CSS to make a simple website with at least two HTML pages linked to one shared CSS file.

I encourage you to explore the new material covered in class, as well as related (but optional) content we may link to along the way (e.g. CSS3 animations). This is your chance to:

1. Build websites that you can link on your resume or code portfolio.
2. Ask the instructor about features you want to learn how to implement.
3. Apply what you're learning to projects you are personally interested in and
   may use outside of just an AD 320 assignment.
4. Get feedback on your use of new languages and technologies we're learning.

Some students may choose to build upon their Creative Project throughout the quarter. You may choose to create a new website for each CP, or build on previous submissions, as long as you meet requirements listed for that particular CP. Remember that these are for you to bring outside of the course, and you are encouraged to explore/ask about material we don't get to cover in class if you would like!

## Ideas for CP1
Here are some ideas for your cp:

* Turn your current resume into a webpage and add that to your site as well and link the two pages together for the start of your own personal Portfolio page that you will share with prospective employers.
* For the second HTML page (the one linked from `about.html`):
  * Write a website for a friend/family member.
  * Write a website with facts on your favorite animal/hobby/topic.
  * Write a website with a few of your favorite recipes.
  * Write a random website about a random thing (and be creative!).
  * Start a blog website, perhaps documenting what you're learning this quarter in one of your classes.
  * Showcase any work about a hobby you may have (art, 3D printing, sports, travel, etc.)
  * Check out [this page](https://startbloggingonline.com/website-ideas/) with other ideas!
* When looking for inspiration, remember that the work you submit must be your own.

## External Requirements
* Your project must include the following 3 files (you may choose to include more):
  * A completed `about.html` (do not change this file name) following instructions in the source code. You _may_ add to the HTML in this file if you wish - this structure is included to get you started. However, please do not delete any of the provided html.
  * One other `.html` file (you can choose the filename) that is linked from `about.html` with an `<a>` tag.
  * A `styles.css` file.
* You must link `styles.css` to both `about.html` and your other HTML page to style your website with a consistent look and feel. You may add a second `.css` file to either page to factor out styles that are not shared by both pages (you can add a second CSS file with an additional `<link>` tag in the HTML `<head>`).
If you choose to use a second stylesheet, you should use `styles.css` only for styles that are shared by both HTML pages. This is good practice to improve website maintainability.
* **In your second `.html` file**, you must use at least 8 different types of HTML tags total in the `<body>`, in addition to the required `<!DOCTYPE html>`, `<html>`, `<head>`, `<title>`, `<link>`, and `<body>`
  * Suggestion: Refer to [this page](https://developer.mozilla.org/en-US/docs/Web/HTML/Element) for a comprehensive list of different HTML tags. You may use ones we haven't talked about in lecture, since there are many more that we could possibly cover in class as long as they are not in the list of deprecated tags from [this page](http://www.tutorialspoint.com/html5/html5_deprecated_tags.htm).
  * At least 2 of the 8 tags should be semantic tags listed under "HTML Layout Elements in More Detail" [here](https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/Document_and_website_structure#HTML_layout_elements_in_more_detail).
* `styles.css` must have:
  * You must use Flexbox, Grid or a combination of the two for your CSS styling and structure.
  * At least 4 additional different rulesets other than the one with the `body` selector provided in the starter file. Refer to [this page](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference#Selectors) for a CSS reference of selectors. One of your rulesets must use a combinatorial selector, and one of your rulesets should have a grouped (comma-separated) selector.
  * At least 10 different CSS properties defined which style content in your HTML files. You may change/remove the CSS properties in the starter `styles.css`. The 5 provided properties _do count_ towards the required 10.
  * At least one [Google font](https://fonts.google.com/) of your choice imported and used with an appropriate default font (e.g. `sans-serif`) specified. Remember to import Google fonts in the `head` of your HTML file using a `link` tag! The Google font link must be the one that's generated for you while selecting fonts on the Google Font site.
* **All links, file and directory names in your project must be lowercased without spaces** (e.g. `img/puppy.jpg` but not `img/puppy.JPG`, `IMG/puppy.jpg` or `img/Puppy.jpg`). This is enforced to avoid broken links commonly occurring in CP submissions due to case-insensitivity of file names on Windows machines. In general, it is also just good practice for file/directory naming.

## Internal Requirements
* Links to **your** `.html` and `.css` files should be **relative links**, not absolute.
  - A relative link is one that is _relative_ to the current page. For example, this means that if both your `.html` files are located in the same directory at the same level you can add a link to the second `.html` file from the first using the name of the desired `.html` file.
* Your HTML and CSS should demonstrate good code quality as demonstrated in class. Common good code quality practices include:
  * Using consistent indentation, proper naming conventions, curly brace locations, etc. Remember that IDs and classes should be in all-lowercase conventions and multiple words are optionally separated by "-".
  * Keep lines fewer than 100 characters for readability (links are an exception to this rule)
  * Do not express style information in the HTML, such as through inline styles or presentational HTML tags such as `b`, `i` or `font`.
  * Prefer CSS selectors instead of using too many classes or IDs in your HTML.
  * Do not include unused, duplicate, or overridden CSS rules or rulesets and use shared CSS selectors to factor out redundancy. Make sure to double-check that you didn't leave any unused styles in before submitting!
* For full credit, all HTML and CSS files must be well-formed.
* Note: You _may_ use a framework such as Bootstrap to help with your styling and helpful responsive layout features, however you must still meet all of the above requirements and demonstrate that you understand the key concepts of how the HTML and CSS work. Any framework code _will not count_ towards HTML/CSS requirements (e.g. if you use the Bootstrap "container" class in your HTML, you cannot count the CSS implementation in the bootstrap.css file towards the CSS requirements), however you can add new (not duplicate) CSS for this class to `styles.css`. You are not allowed to use any template HTML files for frameworks (this defeats the purpose of writing HTML and CSS from scratch in this first assignment).
  * Don't know what any of that means but want to learn how to use a CSS framework? Ask about them in office hours!

## Documentation
* Place a comment header in **each file** with your name, date, and a brief description of the document, and the file's contents. A good file header description is typically 2-3 sentences. Examples are shown below:

    HTML File:

    ```
    <!--
      Name: Tim Mandzyuk
      Date: September 7, 2023
      This is the index.html page for my portfolio of web development work.
      It includes links to side projects I have done during AD 320, including an
      about page, a blog template, and a cryptogram generator.
    -->
    ```

    CSS File:

    ```
    /*
      Name: Tim Mandzyuk
      Date:  September 7, 2023
      This is the styles.css page for my portfolio of web development work.
      It is used by all pages in my portfolio to give the site a consistent
      look and feel.
    */
    ```

## Grading
Grading for Creative Projects is lighter with the chance to explore and learn without the overhead of having to match strict external requirements. My goal is to give you feedback, particularly on the internal requirements and documentation.

---
---

# Creative Project 2: Interactive API-Driven Webpage

### Purpose
To practice and demonstrate proficiency in creating an interactive and dynamic webpage that integrates user-driven interactivity with data retrieved from public APIs using JavaScript.

### Skills Used
HTML, CSS, JavaScript (including Fetch API, DOM manipulation, and event handling), API integration, and web development best practices.

### Knowledge Goals
Understanding and applying concepts of asynchronous JavaScript programming, API requests and responses, DOM manipulation, event-driven programming, and maintaining code quality and standards in web development.

### [Github Repo for CP2](https://github.com/NSC-BS-CS/AD320_CP2)

---

## Overview
In this project, you will create a dynamic and interactive webpage that combines the power of user-driven interactivity with data retrieved from a public API. Your task is to build a fully functional webpage that responds to user actions, fetches data asynchronously, and displays it in a meaningful way on the page. This project will help you gain experience in working with JavaScript for DOM manipulation, handling user events, and using the Fetch API to interact with external data sources.

> **DO NOT USE TECHNOLOGIES BEYOND THE SCOPE OF THIS PROJECT. DO NOT USE NODE OR REACT. LEAVE YOUR API KEY IN THE PROJECT REPO FOR ME.**

Learning how to find and use public APIs is an extremely important skill in modern web development. There are a ton of APIs on the web today, including ones for dog breeds, government datasets, dictionary web services, weather data, etc.

The APIs supported for CP3 all return data in JSON or plaintext format since we cover that more in this class, and these formats tend to be easier to work with.

---

## Choosing an API
Choose from one of the following public APIs, or contact the professor to get approval for another:
- [Random User Generator API](https://randomuser.me)
- [Faker API](https://fakerapi.it/en)
- [Zippopotam API](http://www.zippopotam.us)
- [D&D API](https://www.dnd5eapi.co)
- [PokeAPI](https://pokeapi.co)
- [Debt to the Penny API](https://fiscaldata.treasury.gov/datasets/debt-to-the-penny/debt-to-the-penny)
- [CheapShark API](https://www.cheapshark.com/api)
- [Memes API](https://api.imgflip.com/get_memes)
- [FDA API](https://open.fda.gov/api/)

---

## Getting Started

### 1. Design Your Webpage (HTML/CSS)
Start by creating the structure and layout of your webpage using HTML and CSS. Design the page to include both static elements (such as headers, buttons, and forms) and placeholders where dynamic content from the API will be displayed.

Consider how the user interface (UI) will look and function. Think about the elements users will interact with, such as buttons, input fields, or dropdown menus.

### 2. Plan Your Interactive Elements (JavaScript)
Identify the key interactive elements of your webpage. Plan how these elements will respond to user interactions, such as button clicks, form submissions, or other events.

Create a table to map out the user events, the elements that will listen for these events, and the changes that will occur as a result. For example:
Event 	Element Listening to Event 	Response/Elements Changed
Click 	Button with id #fetchData 	Fetch data from API and display it in a div with id #results

### 3. Choose a Public API
Select a public API from the list provided. Review the API documentation to understand how to build the URL for fetching data. Pay attention to the base URL, required query parameters, and any optional parameters that could customize the request.

Test your API request by manually constructing the URL with the required parameters and accessing it in your browser to view the JSON response.

---

## Implementing the Fetch API
Write JavaScript code to make asynchronous requests to the API using the Fetch API. Your code should retrieve data from the API based on user interactions (e.g., button clicks) and then dynamically update the webpage with the received data.

Ensure you handle possible errors in the fetch request, such as network issues or invalid responses, by displaying user-friendly error messages directly on the page.

...

**Note about API Keys**
Some public APIs require an API key to access their services. An API key is used to manage and limit the number of requests that a service handles. You will need to obtain a free API key for the API you choose, following the instructions provided in the API’s documentation. Be sure to avoid any paid subscription plans. If you have any questions or run into issues obtaining or using your API key, don't hesitate to ask for help.

---

## External Requirements

- **HTML/CSS:**
    - `index.html`: The main HTML file for your webpage, structured with semantic HTML elements.
    - `styles.css`: A CSS file to style your HTML elements, ensuring a cohesive and visually appealing design.
    - Additional HTML file

- **JavaScript:**
    - `index.js`: A JavaScript file containing your code for handling user interactions, making API requests, and dynamically updating the DOM.

...

For **full credit**, your page must not only match the External Requirements listed above, but you must also demonstrate that you understand what it means to write code following a set of programming standards.

---

## Internal Requirements

For full credit, your page must not only match the External Requirements listed above, but you must also demonstrate that you understand what it means to write code following a set of programming standards. Your code should maintain good code quality. Make sure to review the slides specific to JavaScript! We also expect you to implement relevant feedback from previous assignments. Some guidelines that are particularly important to remember for this assignment are included below.

### Code Quality and Standards

- **Consistent Formatting**: Ensure that your HTML, CSS, and JavaScript code adheres to consistent formatting standards. This includes:
  - Proper use of whitespace and indentation for readability.
  - Consistent and meaningful naming conventions for variables, functions, and classes.
  - Proper placement of curly braces in JavaScript, as demonstrated in class examples.

- **File and Link Management**:
  - All file names, links, and extensions in your project must be lowercase and without spaces (e.g., img/puppy.jpg, not img/Puppy.JPG or img/puppy.JPG). This prevents broken links and ensures cross-platform consistency.
  - Use relative links, not absolute, when linking to .html, .css, and .js files.

### HTML/CSS

- **Standards Compliance**: Follow best practices for HTML and CSS, including:
  - Consistent use of classes and IDs.
  - Proper separation of content (HTML), presentation (CSS), and behavior (JavaScript).
  - Avoid redundancy in CSS, and ensure that your CSS is clean and efficient.
  - Ensure all HTML and CSS files are well-formed and validated.

### JavaScript

- **Function Decomposition**: Write small, reusable functions that perform a single task. Avoid large, monolithic functions, and limit the use of anonymous functions. Use named functions for meaningful behavior.

- **Variable Management**:
  - Localize variables as much as possible. Avoid using global variables; instead, utilize module-global variables only when absolutely necessary.
  - Use `const` with UPPER_CASED naming conventions for constants (e.g., file paths).
  - Minimize the use of module-global variables, especially for DOM elements or objects returned by functions like `document.getElementById`.

- **JavaScript and HTML Separation**:
  - Do not embed JavaScript directly within your HTML files. Instead, link your JavaScript using `<script src="...">` in the HTML `<head>`.
  - Avoid including HTML tags as strings in your JavaScript (e.g., `el.innerHTML = "<p>Foo</p>";`).

- **Event Handling**:
  - Implement event handlers for user interactions (e.g., mouse events, keyboard events, timers) using JavaScript functions in your .js file.
  - Use `window.addEventListener("load", functionName)` to ensure that your scripts run after the page has fully loaded.

- **Styling and the DOM**:
  - Minimize styling directly within JavaScript (e.g., modifying the `.style` property). Instead, use the `classList` API (add, remove, toggle) to manipulate classes on DOM elements, and define those classes in your CSS.
  - Exceptions can be made for dynamically generated styles or positions that cannot be reasonably factored out into CSS.

- **Module-Global Pattern**:
  - All JavaScript code should follow the module-global pattern and include `"use strict";` to enforce stricter parsing and error handling in your scripts.

- **AJAX and Fetch API**:
  - All asynchronous requests in your JavaScript code must use the Fetch API.
  - Avoid unnecessary or redundant API requests. Ensure that all data retrieved from an API is used meaningfully, and be mindful of request limits imposed by some APIs.

- **Additional Promise and/or Async/Await**:
  - You must have two additional promise and/or async/await functions in your webpage, however you want to develop them, in addition to your fetches.

### Documentation

- **File Headers**:
  - Include a comment header in each file (`index.html`, `styles.css`, and `index.js`) with your name, the date, and a brief description of the file’s purpose.

- **JSDoc**:
  - Document all JavaScript functions using JSDoc format, including `@
