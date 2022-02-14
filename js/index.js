const API_KEY = "b991401f-1560-41ac-b36b-867d1c5c49c8";
const API_URL_POPULAR = "https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page=1";
const API_URL_SEARCH = "https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=";
const form = document.querySelector("form");
const search = document.querySelector(".search")
getMovies(API_URL_POPULAR)

async function getMovies(url){
  const resp = await fetch(url,{
    headers:{
      "Content-Type": "application/json",
      "X-API-KEY" : API_KEY,
    }
  });
  const respData = await resp.json();
  showMovies(respData);
}

function getClassByRate(vote){
  if(vote >=7){
    return "green"
  }else if (vote >5){
    return "orange"
  }else return "red"
}

function showMovies(data) {
  const moviesEl = document.querySelector('.movies');
  document.querySelector(".movies").innerHTML = "";

  data.films.forEach((movie) => {
    const movieEl = document.createElement("div");
    movieEl.classList.add("movie");
    movieEl.innerHTML = `
    <div class="movie_cover-inner">
            <img src="${movie.posterUrlPreview}" alt="${movie.nameRu}" class="movie_cover">
            <div class="movie_cover--dark"></div>
          </div>
          <div class="movie_info">
            <div class="movie_title">${movie.nameRu}</div>
            <div class="movie_category">${movie.genres.map((genre) => ` ${genre.genre}`)}</div>
            
            ${movie.rating   && 
            `
              <div class="movie_average movie_average-${getClassByRate(movie.rating)}">${movie.rating}</div>
            `
            }
          </div>
    `;
    moviesEl.appendChild(movieEl);
  });
}

form.addEventListener("submit", (e)=>{
  e.preventDefault();

  const apiSearchUrl = `${API_URL_SEARCH}${search.value}`;
  if(search.value){
    getMovies(apiSearchUrl);

    search.value = ""
  }
});




