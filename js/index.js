"use strict";
const apiKey = "88f3b4766c0ecab7f9b9ed72542551c2";

window.addEventListener("load", init);

async function init() {
  try {
    const horrorMovies = await fetchHorrorMovies();
    await displayMovies(horrorMovies);
  } catch (error) {
    console.error("Error initializing:", error);
  }
}

async function fetchHorrorMovies() {
  const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=27&sort_by=popularity.desc`;
  const errorMessageElement = document.getElementById("error-message");

  try {
    const response = await fetch(url);
    await statusCheck(response);
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Error fetching horror movies:", error);
    errorMessageElement.textContent =
      "I'm sorry, there was an error retrieving the movie data.";
    return [];
  }
}

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
  moviesContainer.classList.remove("disabled");
}

function fetchTrailer(movieId) {
  const url = `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${apiKey}`;

  return fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const trailer = data.results.find(
        (video) => video.type === "Trailer" && video.site === "YouTube"
      );

      if (trailer) {
        const trailerUrl = `https://www.youtube.com/watch?v=${trailer.key}&autoplay=1`;
        window.open(trailerUrl, "_blank");
      } else {
        alert("Trailer not available");
      }
    })
    .catch((error) => {
      console.error("Error fetching trailer:", error);
      alert("Error loading trailer.");
    });
}

async function statusCheck(response) {
  if (!response.ok) {
    throw new Error(await response.text());
  }
  return response;
}
