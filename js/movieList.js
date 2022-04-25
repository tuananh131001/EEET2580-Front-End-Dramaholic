const movieListElement = document.querySelector(".movie-list");
const list = [];
function createDivMovie(x) {
  let title = document.createElement("h2");
  title.className = "card-title";
  title.textContent = x.title;
  return title;
}
async function getMovieList(movieListArray) {
  const movieList = await fetch("https://dramaholic.herokuapp.com/api/movies");
  const response = await movieList.json();
  const content = await response.content;
  for (let i = 0; i < content.length; i++) {
    await movieListArray.push(createDivMovie(content[i]));
  }
  for (let i = 0; i < movieListArray.length; i++) {
    await movieListElement.appendChild(movieListArray[i]);
  }
}
getMovieList(list);
