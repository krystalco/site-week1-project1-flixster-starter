const apiKey = 'c807427d0f2458f0b44569bb2c38e62b';
let currentPage = 1;
let searchBool = false;
// let searchButton = document.getElementById("searchButton");
// let clearSeach = document.getElementById("clearSearch");
//fetching the movies
function fetchMovies() {
    const apiUrl = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&page=${currentPage}`;
    
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        // Process the received data and display movie information
        displayMovies(data.results);
      })
  }

//displaying the movies
function displayMovies(movies) {
    const movies_grid = document.querySelector('#movies-grid');
    movies.forEach((movie) => {
// Create elements to display movie information
    const movieCard = document.createElement('div');
    movieCard.classList.add('movie-card');

    const movieImage = document.createElement('img');
    movieImage.classList.add('movie-poster');
    movieImage.src = `https://tmdb.org/t/p/w342${movie.poster_path}`;
    movieImage.alt = movie.title + ' Poster';

    const movieRank = document.createElement('p');
    movieRank.classList.add('movie-votes');
    movieRank.innerText = `⭐️ ${movie.vote_average}`;


    const movieTitle = document.createElement('h2');
    movieCard.classList.add('movie-title');
    movieTitle.innerText = movie.title;
    // Append movie information to the movie card
    // Append the movie card to the movies container
    movieCard.appendChild(movieImage);
    movieCard.appendChild(movieRank);
    movieCard.appendChild(movieTitle);
    movies_grid.appendChild(movieCard);
     } );
}

// searchButton.addEventListener('click', searchMovies());
// clearButton.addEventListener('click', clearSearch());

function searchMovies() {
  if  (document.getElementById('search-input').value != "") {
  const searchQuery = document.querySelector('#search-input').value;
  const apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchQuery}`;
  document.querySelector('#movies-grid').innerHTML = '';
  fetch(apiUrl).then(response => response.json()).then(data => {
    displayMovies(data.results);
  }).catch(e => console.log(e))
  searchBool = true;
}
}
//Load More Movies
function loadMoreMovies() {
    currentPage++;
    fetchMovies();
}

function clearSearch () {
  //event.preventDefault()
  if (searchBool) {
  document.querySelector('#movies-grid').innerHTML = '';
  document.getElementById('search-input').value = "";
  let currentPage = 1;
  fetchMovies();
  searchBool = false
  }
};


window.onload = function () {
    fetchMovies();
}


