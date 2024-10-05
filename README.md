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

This CP will be out of 100 points.

### Academic Integrity
Creative Projects are unique in that students may look for outside resources for inspiration or assistance in accomplishing their goals. On occasion students may wish to use portions of sample code that has been obtained on our course website or others. In order to avoid academic misconduct for a Creative Project in AD 320 you must include school appropriate content. If I find inappropriate content or plagiarism in CPs **you will be ineligible for any points on the CP**. Ask Tim if you're unsure if your work is cited appropriately. Any external sources like images should be cited where used in the source code or (ideally) visible in a page footer.
