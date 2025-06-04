// for index.html
if (window.location.pathname.includes("index.html") || window.location.pathname === "/" || window.location.pathname === "/index") {
  window.onload = function () {
      alert("Welcome to our movie community!");

      let recommendedMovies = [
          "Inception", "Interstellar", "Dune", "Avatar",
          "The Batman", "Parasite", "The Shawshank Redemption", "Pulp Fiction"
      ];

      let randomIndex = Math.floor(Math.random() * recommendedMovies.length);
      let randomMovie = recommendedMovies[randomIndex];

      let movieCard = document.createElement("div");
      movieCard.className = "movie-card-special";
      movieCard.innerHTML = `
          <h2>🎬 Today's Special Recommendation</h2>
          <h3>${randomMovie}</h3>
          <p>Don't miss this masterpiece! ✨</p>
      `;
      document.getElementById("movie-of-the-day").appendChild(movieCard);

      const luckyNumber = Math.floor(Math.random() * 100) + 1;
      const messageBox = document.createElement("div");
      messageBox.className = "lucky-number-section";
      messageBox.innerHTML = `
          <h3>Your Lucky Movie Number</h3>
          <div class="lucky-number">${luckyNumber}</div>
          <p class="lucky-message">${
              luckyNumber % 2 === 0 
                  ? "This is an even number. You might enjoy something visually stunning today. 🎬" 
                  : "This is an odd number. You may prefer a deep or indie film experience. 🎭"
          }</p>
          <p class="lucky-suggestion">${
              luckyNumber > 50 
                  ? "Feeling bold? Try something action-packed or mind-bending! 💥" 
                  : "Looking for comfort? A heartfelt drama or classic might be perfect. ❤️"
          }</p>
      `;
      document.getElementById("lucky-number-container").appendChild(messageBox);

      let movieListContainer = document.getElementById("recommended-movies-list");
      movieListContainer.innerHTML = '<div class="movies-grid"></div>';
      let moviesGrid = movieListContainer.querySelector(".movies-grid");

      recommendedMovies.forEach(movie => {
          let movieItem = document.createElement("div");
          movieItem.className = "movie-item";
          movieItem.innerHTML = `
              <h4>${movie}</h4>
              <div class="movie-rating">
                  <i class="fas fa-star"></i>
                  <span>${(Math.random() * 2 + 3).toFixed(1)}/5</span>
              </div>
              <button class="add-to-watchlist">+ Add to Watchlist</button>
          `;
          moviesGrid.appendChild(movieItem);
      });

      let watchlistButtons = document.querySelectorAll(".add-to-watchlist");
      watchlistButtons.forEach(button => {
          button.addEventListener("click", function () {
              this.textContent = "✓ Added!";
              this.style.backgroundColor = "#28a745";
              this.style.color = "white";
              this.disabled = true;
          });
      });
  };
}

// for login.html
if (document.getElementById("email") && document.getElementById("password")) {
    $("#toggle-password-login").on("click", function() {
        let passwordInput = $("#password");
        if (passwordInput.attr("type") === "password") {
            passwordInput.attr("type", "text");
            $(this).text("Hide");
        } else {
            passwordInput.attr("type", "password");
            $(this).text("Show");
        }
    });

    $("form").on("submit", function(e) {
        e.preventDefault();
        let email = $("#email").val().trim();
        let password = $("#password").val().trim();
        $("#login-message").remove();
        if (email.length < 5 || password.length < 6) {
            $(this).append('<div id="login-message" style="color:#ff4d4d;margin-top:10px;display:none;">Invalid email or password length.</div>');
            $("#login-message").fadeIn(500).delay(2000).fadeOut(500);
        } else {
            $(this).append('<div id="login-message" style="color:#28a745;margin-top:10px;display:none;">Login successful! Redirecting...</div>');
            $("#login-message").fadeIn(500);
            setTimeout(function() {
                window.location.href = "index.html";
            }, 2000);
        }
    });

    $("#email").removeAttr("required").attr("required", true);
    $("#password").removeAttr("required").attr("required", true);
}


// for register.html
if (document.getElementById("registerEmail") && document.getElementById("registerPassword") && document.getElementById("username")) {
    $("#toggle-password-register").on("click", function() {
        let passwordInput = $("#registerPassword");
        if (passwordInput.attr("type") === "password") {
            passwordInput.attr("type", "text");
            $(this).text("Hide");
        } else {
            passwordInput.attr("type", "password");
            $(this).text("Show");
        }
    });

    $("form").on("submit", function(e) {
        e.preventDefault();
        let username = $("#username").val().trim();
        let email = $("#registerEmail").val().trim();
        let password = $("#registerPassword").val().trim();
        $("#register-message").remove();
        if (username.length < 3 || email.length < 5 || password.length < 6 || !$("#termsCheck").is(":checked")) {
            $(this).append('<div id="register-message" style="color:#ff4d4d;margin-top:10px;display:none;">Please fill all fields correctly and agree to terms.</div>');
            $("#register-message").fadeIn(500).delay(2000).fadeOut(500);
        } else {
            $(this).append('<div id="register-message" style="color:#28a745;margin-top:10px;display:none;">Registration successful! Redirecting...</div>');
            $("#register-message").fadeIn(500);
            setTimeout(function() {
                window.location.href = "login.html";
            }, 2000);
        }
    });

    $("#registerEmail").removeAttr("required").attr("required", true);
    $("#registerPassword").removeAttr("required").attr("required", true);
    $("#username").removeAttr("required").attr("required", true);
}

// for reviews.html
if (document.querySelector(".row") && document.querySelector(".card")) {
    $(".card-body").each(function () {
        let randomRating = (Math.random() * 2 + 3).toFixed(1);
        $(this).append('<div class="mt-3" style="color:#ffc107;font-weight:bold;">⭐ ' + randomRating + '/5</div>');
        $(this).append('<button class="like-btn" style="margin-top:10px;padding:6px 12px;background-color:#0d6efd;border:none;border-radius:8px;color:white;cursor:pointer;">👍 0</button>');
    });

    $(document).on("click", ".like-btn", function () {
        let count = parseInt($(this).text().replace("👍 ", ""));
        $(this).text("👍 " + (++count));
    });

    $("#filter-reviews").on("change", function () {
        let value = $(this).val();
        let cards = $(".row > div").toArray();
        switch (value) {
            case "new":
                cards.sort((a, b) => b.dataset.index - a.dataset.index);
                break;
            case "old":
                cards.sort((a, b) => a.dataset.index - b.dataset.index);
                break;
            case "popular":
                cards.sort((a, b) => {
                    let likesA = parseInt($(a).find(".like-btn").text().replace("👍 ", ""));
                    let likesB = parseInt($(b).find(".like-btn").text().replace("👍 ", ""));
                    return likesB - likesA;
                });
                break;
        }
        $(".row").empty().append(cards);
    });

    $(".row > div").each(function (index) {
        $(this).attr("data-index", index);
    });
}

// for trailers.html
if (document.getElementById("trailers-row")) {
  const clickSound = new Audio("click.mp3");

  const trailers = [
    {
      title: "Dune: Part Two",
      description: "Paul Atreides unites with Chani and the Fremen while seeking revenge.",
      youtube: "https://www.youtube.com/embed/Way9Dexny3w"
    },
    {
      title: "Oppenheimer",
      description: "The story of American scientist J. Robert Oppenheimer and his role in the atomic bomb.",
      youtube: "https://www.youtube.com/embed/uYPbbksJxIg"
    },
    {
      title: "Barbie",
      description: "Barbie and Ken are having the time of their lives in Barbie Land.",
      youtube: "https://www.youtube.com/embed/pBk4NYhWNMM"
    },
    {
      title: "Avatar: The Way of Water",
      description: "Jake Sully and Neytiri have formed a family, but their peace is threatened.",
      youtube: "https://www.youtube.com/embed/d9MyW72ELq0"
    },
    {
      title: "Guardians of the Galaxy Vol. 3",
      description: "The Guardians must fight to protect the universe from a new threat.",
      youtube: "https://www.youtube.com/embed/u3V5KDHRQvk"
    },
    {
      title: "Mission: Impossible - Dead Reckoning",
      description: "Ethan Hunt faces his most dangerous mission yet.",
      youtube: "https://www.youtube.com/embed/avz06PDqDbM"
    }
  ];

  const container = document.getElementById('trailers-row');

  for (let i = 0; i < trailers.length; i++) {
    const trailer = trailers[i];
    const card = document.createElement('div');
    card.className = 'trailer-card';
    card.innerHTML = `
      <div class="card h-100">
        <div class="card-body d-flex flex-column gap-3">
          <h5 class="card-title text-center mb-0">${trailer.title}</h5>
          <div class="trailer-container"></div>
          <p class="card-text mb-0">${trailer.description}</p>
          <div class="d-flex flex-column flex-md-row gap-2">
            <button class="view-trailer-btn w-100" data-video="${trailer.youtube}" style="padding:10px; background:#0d6efd; border:none; border-radius:20px; color:white; cursor:pointer;">Watch Trailer</button>
            <button class="favorite-btn w-100" style="padding:10px; background:#28a745; border:none; border-radius:20px; color:white; cursor:pointer;">+ Add to Favorites</button>
          </div>
        </div>
      </div>
    `;
    container.appendChild(card);
  }

  const trailerButtons = document.getElementsByClassName("view-trailer-btn");
  for (let btn of trailerButtons) {
    btn.addEventListener("click", function () {
      clickSound.play();

      const videoURL = btn.getAttribute("data-video");
      const cardBody = btn.closest(".card-body");
      const trailerContainer = cardBody.querySelector(".trailer-container");

      if (trailerContainer.children.length > 0) {
        trailerContainer.innerHTML = "";
        btn.textContent = "Watch Trailer";
      } else {
        trailerContainer.innerHTML = `
          <div class="ratio ratio-16x9">
            <iframe src="${videoURL}" allowfullscreen></iframe>
          </div>
        `;
        btn.textContent = "Hide";
      }
    });
  }

  const favoriteButtons = document.getElementsByClassName("favorite-btn");
  for (let btn of favoriteButtons) {
    btn.addEventListener("click", function () {
      clickSound.play();

      if (!btn.classList.contains("added")) {
        btn.textContent = "✓ Added to Favorites";
        btn.style.backgroundColor = "#ffc107";
        btn.style.color = "#000";
        btn.classList.add("added");

        const movieTitle = btn.closest(".card-body").querySelector(".card-title").textContent;
        console.log(`Added to favorites: ${movieTitle}`);

        let favorites = JSON.parse(localStorage.getItem("favoriteTrailers")) || [];
        favorites.push(movieTitle);
        localStorage.setItem("favoriteTrailers", JSON.stringify(favorites));
      }
    });
  }
}

//for ratings.html

document.getElementById("compareBtn").addEventListener("click", function() {
  const a = parseFloat(document.getElementById("movieA").value);
  const b = parseFloat(document.getElementById("movieB").value);
  const result = document.getElementById("compare-result");

  if (isNaN(a) || isNaN(b)) {
      result.style.color = "#dc3545";
      result.textContent = "❗ Please enter valid ratings (0-10) for both movies.";
      return;
  }

  if (a < 0 || a > 10 || b < 0 || b > 10) {
      result.style.color = "#dc3545";
      result.textContent = "❗ Ratings must be between 0 and 10.";
      return;
  }

  if (a > b) {
      result.style.color = "#28a745";
      result.textContent = "🍿 Movie A is better!";
  } else if (b > a) {
      result.style.color = "#ffc107";
      result.textContent = "🎬 Movie B is better!";
  } else {
      result.style.color = "#17a2b8";
      result.textContent = "🤝 Both movies are equally rated!";
  }
});

//for community.html
document.addEventListener("DOMContentLoaded", () => {
  if (window.location.pathname.endsWith("community.html")) {
    let favoriteMovies = JSON.parse(localStorage.getItem("favoriteMovies")) || [];

    function updateMovieList() {
      const list = document.getElementById("movie-list");
      if (!list) return;
      list.innerHTML = "";

      favoriteMovies.forEach((movie, index) => {
        const li = document.createElement("li");
        li.className = "list-group-item d-flex justify-content-between align-items-center bg-dark text-white border-secondary";

        const movieNameSpan = document.createElement("span");
        movieNameSpan.className = "movie-name";
        movieNameSpan.textContent = movie;

        const editBtn = document.createElement("button");
        editBtn.className = "btn btn-sm btn-warning me-2 edit-btn";
        editBtn.textContent = "Edit";

        const deleteBtn = document.createElement("button");
        deleteBtn.className = "btn btn-sm btn-danger delete-btn";
        deleteBtn.textContent = "Delete";

        li.append(movieNameSpan, editBtn, deleteBtn);
        list.appendChild(li);

        editBtn.addEventListener("click", () => {
          if (movieNameSpan.contentEditable === "true") {
            movieNameSpan.contentEditable = "false";
            favoriteMovies[index] = movieNameSpan.textContent.trim();
            localStorage.setItem("favoriteMovies", JSON.stringify(favoriteMovies));
            editBtn.textContent = "Edit";
          } else {
            movieNameSpan.contentEditable = "true";
            movieNameSpan.focus();
            editBtn.textContent = "Save";
          }
        });

        deleteBtn.addEventListener("click", () => {
          favoriteMovies.splice(index, 1);
          localStorage.setItem("favoriteMovies", JSON.stringify(favoriteMovies));
          updateMovieList();
        });
      });
    }

    function addMovie() {
      const input = document.getElementById("movie-input");
      const movieName = input.value.trim();

      if (movieName) {
        favoriteMovies.push(movieName);
        input.value = "";
        localStorage.setItem("favoriteMovies", JSON.stringify(favoriteMovies));
        updateMovieList();
      }
    }

    const addBtn = document.getElementById("add-movie-btn");
    const inputEl = document.getElementById("movie-input");

    if (addBtn && inputEl) {
      addBtn.addEventListener("click", addMovie);
      inputEl.addEventListener("keypress", (e) => {
        if (e.key === "Enter") addMovie();
      });
    }

    updateMovieList();
  }
});
