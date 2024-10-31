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
  const apiKey = "88f3b4766c0ecab7f9b9ed72542551c2";

  window.addEventListener("load", init);

  /**
   * Funtion that initializes the pages content.
   */
  async function init() {
    try {
      const horrorMovies = await fetchHorrorMovies();
      await displayMovies(horrorMovies);
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
    const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=27&sort_by=popularity.desc`;

    try {
      const response = await fetch(url);
      await statusCheck(response);
      const data = await response.json();
      return data.results;
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
   * @param {*} movies
   */
  async function displayMovies(movies) {
    const moviesContainer = document.getElementById("movies-jsContainer");
    moviesContainer.innerHTML = "";

    movies.forEach((movie) => {
      const movieElement = document.createElement("div");
      movieElement.classList.add("each-movie");

      movieElement.innerHTML = `
            <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
            <h4>${movie.title}</h4>
            <p>Release Date: ${movie.release_date}</p>
    `;

      movieElement.addEventListener("click", (e) => {
        e.preventDefault();
        fetchTrailer(movie.id);
      });

      moviesContainer.appendChild(movieElement);
    });
    return Promise.resolve().then(() => {
      moviesContainer.classList.remove("disabled");
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
      const url = `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${apiKey}`;

      try {
        const response = await fetch(url);
        const data = await response.json();
        const trailer = data.results.find(
          (video) => video.type === "Trailer" && video.site === "YouTube"
        );

        if (trailer) {
          const trailerUrl = `https://www.youtube.com/watch?v=${trailer.key}&autoplay=1`;
          window.open(trailerUrl, "_blank");
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
    const errorMessageElement = document.getElementById("error-message");
    errorMessageElement.textContent = message;
    errorMessageElement.classList.remove("hidden");
  }

  /**
   * Helper funtionc used to over lay semi transparent loading effect over screen.
   */
  function showLoadingOverlay() {
    const loadingOverlay = document.getElementById("loading-overlay");
    const loadingVideo = loadingOverlay.querySelector("video");

    loadingVideo.currentTime = 0;
    loadingOverlay.classList.remove("hidden");
    loadingVideo.play();
  }

  /**
   * Helper function that removes loading effect once finished.
   */
  function hideLoadingOverlay() {
    const loadingOverlay = document.getElementById("loading-overlay");
    loadingOverlay.classList.add("hidden");
  }
})();
