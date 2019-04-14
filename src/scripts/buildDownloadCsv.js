// buildDownloadCsv.js
// Builds the csv-download-table with data fetched from the server

const BASE_URL = 'https://wcfb-signin.herokuapp.com';

// Inserts a new row into the csv-download-table
// with the week and link passed as parameters
function insertNewRow(weekString, link) {
    const table = document.getElementById('csv-download-table');
    const row = table.insertRow(-1);
    const weekCell = row.insertCell(0);
    const linkCell = row.insertCell(1);
    weekCell.innerHTML = weekString;
    linkCell.innerHTML = `<a href="${link}">Download</a>`;
}

// wrap main code in async function so 'await' can be used
async function build() {
    //error handling with try TODO WORK ON WORK ON
    //try{
        const weeksResponse = await fetch(`${BASE_URL}/get_weeks`);
    //} catch (e) {
        console.log("ERROR TESTING AHH ERROR");
        console.log(e);
    //}
    //
    const weeksJson = await weeksResponse.json();
    const weeksArray = await weeksJson.weeks.filter(x => x != null);

    for (let i = 0; i < weeksArray.length; i += 1) {
        const date = new Date(weeksArray[i]);
        const dateString = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
        const downloadLink = `${BASE_URL}/get_csvstring/week/${weeksArray[i]}`;
        insertNewRow(dateString, downloadLink);
    }
}

build();
