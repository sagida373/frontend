document.addEventListener('DOMContentLoaded', function () {
      const compareBtn = document.getElementById("compareBtn");
      const toggleBtn = document.getElementById("toggle-top-movies");
      const section = document.getElementById("top-movies-section");
      const resultElement = document.getElementById("compare-result");
      const movieAInput = document.getElementById("movieA");
      const movieBInput = document.getElementById("movieB");
      const topMoviesList = document.getElementById("top-movies-list");
      const apiErrorMessage = document.getElementById("api-error-message");

      const TMDB_API_KEY = '1725fdb22a070855c5f2954fc8a7a41d';
      const TMDB_API_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${TMDB_API_KEY}&language=en-US&page=1`;
      const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w92';

      if (compareBtn) {
        compareBtn.addEventListener("click", function () {
          const ratingA = parseFloat(movieAInput.value);
          const ratingB = parseFloat(movieBInput.value);

          if (isNaN(ratingA) || isNaN(ratingB)) {
            updateResultElement("❌ Please enter valid ratings for both movies!", "#ff4444");
            return;
          }

          if (ratingA > 5 || ratingB > 5 || ratingA < 0 || ratingB < 0) {
            updateResultElement("⚠️ Ratings must be between 0 and 5!", "#ffbb33");
            return;
          }

          if (ratingA > ratingB) {
            updateResultElement(`🎬 <b>Movie A</b> is better! (${ratingA} > ${ratingB})`, "#4CAF50");
          } else if (ratingB > ratingA) {
            updateResultElement(`🍿 <b>Movie B</b> is better! (${ratingB} > ${ratingA})`, "#4CAF50");
          } else {
            updateResultElement(`🤝 <b>Equal ratings!</b> Both are rated ${ratingA}`, "#2196F3");
          }
        });
      }

      toggleBtn.addEventListener("click", function () {
        if (section.style.display === "none") {
          apiErrorMessage.textContent = "";
          fetchTopMoviesFromTMDB();
          section.style.display = "block";
          toggleBtn.textContent = "Hide Top 10 Movies";
        } else {
          section.style.display = "none";
          toggleBtn.textContent = "Show Top 10 Movies";
          topMoviesList.innerHTML = "";
          apiErrorMessage.textContent = "";
        }
      });

      function updateResultElement(message, color) {
        resultElement.innerHTML = message;
        resultElement.style.color = color;
      }

      async function fetchTopMoviesFromTMDB() {
        try {
          const response = await fetch(TMDB_API_URL);
          if (!response.ok) {
            throw new Error(`API error: ${response.status} ${response.statusText}`);
          }
          const data = await response.json();
          const movies = data.results.slice(0, 10); // Get top 10 movies
          generateTopMovies(movies);
        } catch (error) {
          apiErrorMessage.textContent = `⚠️ Failed to load movies: ${error.message}`;
          topMoviesList.innerHTML = "";
        }
      }

      function generateTopMovies(movies) {
  topMoviesList.innerHTML = "";

  movies.forEach((movie, index) => {
    const card = document.createElement("div");
    card.className = "p-3 text-white rounded fw-bold text-center";
    card.style.backgroundColor = index % 2 === 0 ? "#198754" : "#0d6efd";
    card.style.width = "120px";
    card.style.display = "inline-flex";
    card.style.flexDirection = "column";
    card.style.alignItems = "center";
    card.style.justifyContent = "start";
    card.style.borderRadius = "8px";
    card.style.flexShrink = "0";
    card.style.boxShadow = "0 4px 8px rgba(0,0,0,0.3)";
    card.style.marginRight = "20px";

    const img = document.createElement("img");
    img.src = movie.poster_path ? TMDB_IMAGE_BASE_URL + movie.poster_path : "";
    img.alt = movie.title;
    img.style.width = "92px";
    img.style.height = "auto";
    img.style.borderRadius = "8px 8px 0 0";
    img.style.marginBottom = "8px";
    img.style.objectFit = "cover";

    const title = document.createElement("div");
    title.textContent = `${index + 1}. ${movie.title}`;
    title.style.fontSize = "0.85rem";
    title.style.marginBottom = "4px";
    title.style.minHeight = "2.5em";
    title.style.textAlign = "center";

    const rating = document.createElement("div");
    rating.innerHTML = `⭐ ${movie.vote_average.toFixed(1)} / 10`;
    rating.style.fontSize = "0.9rem";

    card.appendChild(img);
    card.appendChild(title);
    card.appendChild(rating);

    topMoviesList.appendChild(card);
  });
}
    });