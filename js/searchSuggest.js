let searchWrapper = document.querySelector(".search-container");
let inputValue = searchWrapper.querySelector("input");
let suggest = searchWrapper.querySelector(".auto-box");

let titleList = [];
async function searchSuggest(suggestionList) {
    const reponse = await fetch("https://dramaholic.herokuapp.com/api/movies");
    const {_embedded} = await reponse.json();


    
}

inputValue.onkeyup = (e) => {
  let current_search = e.target.value;
  const suggestionList = [];
  titleList = [];
  if (current_search) {
    searchSuggest(suggestionList);
  }
  
};
