import axios from "axios";

const options = {
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiOThiODJlYTU3NTMxYTYyYjExNWYyNjAxNjc4ZTUzNyIsInN1YiI6IjY2M2E2OTg2ZDM4ZDRlYzg0NWMzYTQyMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.VIYupigC1NEbjTyaiu-Fai_uu01qewJHfR23hxsmYjY",
  },
};

export async function getTrendingMovies() {
  const url = "https://api.themoviedb.org/3/trending/movie/day?language=en-US";

  const response = await axios.get(url, options);

  return response.data.results;
}

export async function getSearchMovie(movie) {
  const url = `https://api.themoviedb.org/3/search/movie?query=${movie}&include_adult=false&language=en-US&page=1`;

  const response = await axios.get(url, options);

  return response.data.results;
}

export async function getMovieDetails(movieId) {
  const url = `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`;
  const responce = await axios.get(url, options);

  return responce.data;
}

export async function getMovieCast(movieId) {
  const url = `https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-US`;
  const responce = await axios.get(url, options);

  return responce.data;
}

export async function getMovieReviews(movieId) {
  const url = `https://api.themoviedb.org/3/movie/${movieId}/reviews?language=en-US`;
  const responce = await axios.get(url, options);

  return responce.data;
}
