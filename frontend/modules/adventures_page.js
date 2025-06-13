
import config from "../conf/index.js";

let search ="?city=bengaluru";
//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  let urlParam = new URLSearchParams(search);
  let cityId = urlParam.get("city");
  // console.log(cityId);
  return cityId;

}
// getCityFromURL("?city=bengaluru");

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  try{
    let cityName = getCityFromURL(search);
    let rawData = await fetch(config.backendEndpoint + "/adventures?city="+cityName );
    let fetchingData = await rawData.json();
    // console.log(fetchingData);
    return fetchingData;
  }catch(err){
    return null;
  } 
}
let adventures = await fetchAdventures(getCityFromURL(search));
// console.log(adventures);

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
   let inputData = document.getElementById("data");
  for(let i=0;i<adventures.length;i++){
   let adventureCard = `
                <div class="col-xl-3 col-lg-4 col-md-6 col-12 g-1 mb-4"><a href="detail/?adventure=${adventures[i].id}" >  
                <div class="card activity-card card-img-top" style="width: 18rem;">
                    <img src="${adventures[i].image}" class="card-img-top" alt="${adventures[i].name}">
                    <div class="category-banner">${adventures[i].category}</div>
                <div class="card-body">
                <div class="nameCost d-flex justify-content-between">
                    <p class="card-text">${adventures[i].name}</p>
                    <p class="card-text">₹${adventures[i].costPerHead}</p>
                </div>
                <div class="durationHours d-md-flex justify-content-between">
                    <p class="card-text">Duration</p>
                    <p class="card-text">${adventures[i].duration} hr</p>
                </div>
                </div>
                </div>
                </a>
                </div>
                `;
   inputData.innerHTML += adventureCard;
  }
}

document.querySelector("#newAdventureBtn").addEventListener("click",function(){
  addNewButton();
})

async function addNewButton (){
  const rawAPIData = await fetch(config.backendEndpoint+"/adventures/new",{
    method:"POST",
    body:JSON.stringify({"city": "goa"}),
    header:{'Content-type':'application/json;charset=UTF-8'},
  });
  const finalAPIData = await rawAPIData.json();
}










//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list

}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list

}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods


  // Place holder for functionality to work in the Stubs
  return list;
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage

  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object


  // Place holder for functionality to work in the Stubs
  return null;
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills

}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
