import config from "../conf/index.js";

// document.addEventListener("DOMContentLoaded", function() {
//   init();
// });

async function init() {
  //Fetches list of all cities along with their images and description
  console.log("From init()");
  console.log(config.backendEndpoint);
  //-------------------------------------------
  let cities = await fetchCities();
  //Updates the DOM with the cities
  cities.forEach((key) => {
    addCityToDOM(key.id, key.city, key.description, key.image);
  });
  return cities;
}


//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
  try{
  let rawData = await fetch(config.backendEndpoint+"/cities");
  let citiesData = await rawData.json();
  // console.log(citiesData);'
  return citiesData;
  }
  catch(err){
    return null;
  }
  
}


//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM
  let getData = document.getElementById("data");
  console.log(getData);
  getData.innerHTML +=`<div class="col-lg-3 col-md-6 col-12 mb-4">
  <a href="pages/adventures/?city=${id}" id="${id}">
      <div class="card tile"> 
          <img src="${image}" class="card-img-top" alt="${city}">
          <div class="card-body tile-text">
          <h5 class="card-title">${city}</h5>
          <p class="card-text">${description}</p>
        </div>
      </div>
      </a>
    </div>`;
  // getData.innerHTML += cityCard;
  console.log(getData);
}

export { init, fetchCities, addCityToDOM };