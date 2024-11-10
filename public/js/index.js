/*  Name:             Mark Buster
    Date:             10-30-2024
    File Description: This file corresponds to the movies.html page and enables
                      dynamic loading of movies upon loading and clickable movie tiles
                      which take you to see the trailers for each movie.
*/
"use strict";

/**
 * Blank function to keep funcitons and api secure fromm outside file.
 */
(function () {
  const API_KEY = "88f3b4766c0ecab7f9b9ed72542551c2";

  window.addEventListener("load", init);

  /**
   * Funtion that initializes the page's content.
   */
  async function init() {
    try {
      const HORROR_MOVIES = await fetchHorrorMovies();
      await displayMovies(HORROR_MOVIES);
    } catch (error) {
      handleError("Error initializing movies page.");
    }
  }

  /**
   * Function that asynchronously fetches the movie data from TheMovieDatabase.org using their API and
   * provides the data in an array to be displayed later.
   * @returns array of movie objects.
   */
  async function fetchHorrorMovies() {
    const URL = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=27&sort_by=popularity.desc`;

    try {
      const RESPONSE = await fetch(URL);
      await statusCheck(RESPONSE);
      const DATA = await RESPONSE.json();
      return DATA.results;
    } catch (error) {
      console.error("Error fetching horror movies:", error);
      handleError("I'm sorry, there was an error retrieving the movie data.");
      return [];
    }
  }

  /**
   * Function that takes in an array of movie objects and displays them to
   * the user. Also setting up the movie tiles to be clikable and calls fetchTrailer
   * when clicked
   * @param {*} movies object array
   */
  async function displayMovies(movies) {
    const MOVIES_CONTAINER = document.getElementById("movies-jsContainer");
    MOVIES_CONTAINER.innerHTML = "";

    movies.forEach((movie) => {
      const MOVIE_ELEMENT = document.createElement("div");
      MOVIE_ELEMENT.classList.add("each-movie");

      MOVIE_ELEMENT.innerHTML = `
            <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
            <h4>${movie.title}</h4>
            <p>Release Date: ${movie.release_date}</p>
    `;

      MOVIE_ELEMENT.addEventListener("click", (e) => {
        e.preventDefault();
        fetchTrailer(movie.id);
      });

      MOVIES_CONTAINER.appendChild(MOVIE_ELEMENT);
    });
    return Promise.resolve().then(() => {
      MOVIES_CONTAINER.classList.remove("disabled");
    });
  }

  /**
   * Function that finds and navigates to the movie trailer that matches the movieId
   * which is passed in as a parameter. Asynchronously fetches trailer url in order to
   * search youtube for matching trailer and takes the first one that matches. if found,
   * trailer plays in a new tab.
   * @param {*} movieId
   */
  function fetchTrailer(movieId) {
    showLoadingOverlay();

    setTimeout(async () => {
      const URL = `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${API_KEY}`;

      try {
        const RESPONSE = await fetch(URL);
        const DATA = await RESPONSE.json();
        const TRAILER = DATA.results.find(
          (video) => video.type === "Trailer" && video.site === "YouTube"
        );

        if (TRAILER) {
          const TRAILER_URL = `https://www.youtube.com/watch?v=${TRAILER.key}&autoplay=1`;
          window.open(TRAILER_URL, "_blank");
        } else {
          handleError("Trailer is not available.");
        }

        hideLoadingOverlay();
      } catch (error) {
        handleError("Error loading trailer.");
        hideLoadingOverlay();
      }
    }, 6600);
  }

  /* ------------------------------------------------------------------------- */
  /* Helper Functions
  /* ------------------------------------------------------------------------- */

  /**
   * Helper function used to check api connection to TheMovieDatabase.
   * @param {*} response
   * @returns
   */
  async function statusCheck(response) {
    if (!response.ok) {
      throw new Error(await response.text());
    }
    return response;
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
   * Helper funtionc used to over lay semi transparent loading effect over screen.
   */
  function showLoadingOverlay() {
    const LOADING_OVERLAY = document.getElementById("loading-overlay");
    const LOADING_VIDEO = LOADING_OVERLAY.querySelector("video");

    LOADING_VIDEO.currentTime = 0;
    LOADING_OVERLAY.classList.remove("hidden");
    LOADING_VIDEO.play();
  }

  /**
   * Helper function that removes loading effect once finished.
   */
  function hideLoadingOverlay() {
    const LOADING_OVERLAY = document.getElementById("loading-overlay");
    LOADING_OVERLAY.classList.add("hidden");
  }
})();
