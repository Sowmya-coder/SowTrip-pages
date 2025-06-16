import config from "../conf/index.js";

//Implementation of fetch call to fetch all reservations
async function fetchReservations() {
  // TODO: MODULE_RESERVATIONS
  // 1. Fetch Reservations by invoking the REST API and return them
  try{
  let rawData = await fetch(config.backendEndpoint+"/reservations/");
  let reservationData = await rawData.json();
  return reservationData;
  }
  catch(err){
    return null;
  }
  // Place holder for functionality to work in the Stubs
  // return null;
}

//Function to add reservations to the table. Also; in case of no reservations, display the no-reservation-banner, else hide it.
function addReservationToTable(reservations) {
  // TODO: MODULE_RESERVATIONS
  // 1. Add the Reservations to the HTML DOM so that they show up in the table

  //Conditionally render the no-reservation-banner and reservation-table-parent

  try{
  let noReservationBanner = document.getElementById("no-reservation-banner");
  let reservationTableBody = document.getElementById("reservation-table");
  if (reservations = []) {
    noReservationBanner.style.display = "block";
    reservationTableParent.style.display = "none";
      } else {
    noReservationBanner.style.display = "none";
    reservationTableParent.style.display = "block";
    for(let i=0;i<reservations.length;i++){
        let givenDate = reservations[i].date;
        let dates = givenDate.split('-'); //dd/mm/yyyy;
        let formatDate = `${dates[2]}/${dates[1]}/${dates[0]}`;

        let givenTime = new Date(reservations[i].time);
        let time = givenTime.toLocaleTimeString();
        const day = givenTime.getDate();
        const month = givenTime.toLocaleString("default", { month: "long" });
        const year = givenTime.getFullYear();
        let formatTime = `${day} ${month} ${year}, ${time}`;
      reservationTableBody.innerHTML += ` <tr>
                            <td scope="col">${reservations[i].id}</td>
                            <td scope="col">${reservations[i].name}</td>
                            <td scope="col">${reservations[i].adventure}</td>
                            <td scope="col">${reservations[i].person}</td>
                            <td >${formatDate}</td>
                            <td style="gap:5px">${reservations[i].price}</td>
                            <td style="gap:5px">${formatTime}</td>
                            <td style="display:flex; gap:5px"><div class="reservation-visit-button"> <a href = "../detail?adventure=${reservations[i].adventure}">View Adventure</a></div></td>                
                        </tr>`
  }

  }   
}
catch(err){
  return null;
}


  /*
    Iterating over reservations, adding it to table (into div with class "reservation-table") and link it correctly to respective adventure
    The last column of the table should have a "Visit Adventure" button with id=<reservation-id>, class=reservation-visit-button and should link to respective adventure page

    Note:
    1. The date of adventure booking should appear in the format D/MM/YYYY (en-IN format) Example:  4/11/2020 denotes 4th November, 2020
    2. The booking time should appear in a format like 4 November 2020, 9:32:31 pm
  */

}

export { fetchReservations, addReservationToTable };
