import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
   let urlParam = new URLSearchParams(search);
  let adventureId = urlParam.get("adventure");
  // console.log(adventureId);
  // fetchAdventureDetails(adventureId);
  return adventureId;
  // Place holder for functionality to work in the Stubs
  // return null;
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
    // console.log(adventureId);
    try{
    let data = await fetch(config.backendEndpoint +`/adventures/detail/?adventure=${adventureId}`);
    // console.log(data);
    let adventureData = await data.json();
    // console.log(adventureData);
    // addAdventureDetailsToDOM(adventureData);
    return adventureData;
  }catch(err){
    return null;
  } 

  // Place holder for functionality to work in the Stubs
  // return null;
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
  let adventureHeading = document.getElementById("adventure-name");
  let adventureSubHeading = document.getElementById("adventure-subtitle");
  let adventureContent = document.getElementById("adventure-content");
  adventureHeading.textContent = adventure.name;
  adventureSubHeading.textContent = adventure.subtitle;  
  adventureContent.textContent = adventure.content;
 addBootstrapPhotoGallery(adventure.images);
}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
  // console.log(images);
  let photoGallery = document.getElementById("photo-gallery");

  photoGallery.innerHTML = `<div id="imageCarousel" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-indicators">
    <button type="button" data-bs-target="#imageCarousel" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#imageCarousel" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#imageCarousel" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>

  <div class="carousel-inner h-100" id="imagesItems">
  </div>
  <button class="carousel-control-prev" type="button" data-bs-slide="prev" data-bs-target="#imageCarousel">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-slide="prev" data-bs-target="#imageCarousel">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>`;
photoGallery.style.height = "600px";
document.getElementById("imageCarousel").style.height = "100%";
document.getElementById("imagesItems").style.height = "100%";

  const carouselItemParent = document.getElementById("imagesItems");  
  images.forEach((images, idx) => {
    // for(let i=0;i<images.length;i++){
    const carouseItemElement = document.createElement("div");

    // Set as active if id is 0 i.e, first element
    idx === 0
      ? carouseItemElement.classList.add("carousel-item", "h-100", "active")
      : carouseItemElement.classList.add("carousel-item", "h-100");

    carouseItemElement.innerHTML = `<img src=${images} class="w-100 h-100 activity-card-image" alt="" style="object-fit:cover">`;
    // console.log(carouseItemElement);

    carouselItemParent.append(carouseItemElement);
  });
    // }
return carouselItemParent;
}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
    let soldOutId = document.getElementById("reservation-panel-sold-out");
    let reservationAvailable = document.getElementById("reservation-panel-available");
    let reservationPerHeadCost = document.getElementById("reservation-person-cost");

 
  if(adventure.available){
    soldOutId.style.display = "none";
    reservationPerHeadCost.style.display = "block";
    reservationAvailable.style.display = "block";
    reservationPerHeadCost.textContent = adventure.costPerHead;
  }else{
    reservationAvailable.style.display = "none";
    soldOutId.style.display = "block";
    // reservationPerHeadCost.textContent =  0;

  }
}

 

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
//  let reservationPerHeadCost = document.getElementById("reservation-person-cost").textContent;
  let reservationCost = adventure.costPerHead * persons;
  let reservationCostUpdate = document.getElementById("reservation-cost");
  reservationCostUpdate.textContent=reservationCost;
}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
try{
const reserveForm=document.querySelector("#myForm");
  reserveForm.addEventListener("submit", async function(event){
    event.preventDefault();
  const reserveFormElements = reserveForm.elements;
  const bodyString = JSON.stringify({
    name: reserveFormElements["name"].value,
    date: reserveFormElements["date"].value,
    person: reserveFormElements["person"].value,
    adventure: adventure.id,
  });

  const rawAPIData=await fetch(config.backendEndpoint+"/reservations/new ", {
     method:"POST",
    body: bodyString,
  headers: {
      'Content-type': 'application/json; charset=UTF-8',
    }
  });

    if(rawAPIData.ok){
    alert('successful!');
    window.location.reload();
  }else{
    let data = await rawAPIData.json();
    alert(`Failed-${data.message}`);
  }
});
}
  catch(err){
    // console.log(err);
    alert('Failure - fetch call message is error');
}
}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
    let reservedBanner=document.getElementById("reserved-banner");

  if(adventure.reserved){
    reservedBanner.style.display="block";
  }else{
    reservedBanner.style.display="none";
  }
}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
