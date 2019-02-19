const BASE_URL = 'http://localhost:3000';

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

// Builds the csv-download-table with data fetched from the server
async function build() {
    const weeksResponse = await fetch(`${BASE_URL}/get_weeks`);
    const weeksJson = await weeksResponse.json();
    const weeksArray = await weeksJson.weeks.filter(x => x != null);

    // for each week, get the corresponding link and add it to the table
    // if there are multiple csv strings for one week, note it on the console
    const weeksToDownloads = new Set();
    for (let i = 0; i < weeksArray.length; i += 1) {
        const date = new Date(weeksArray[i]);
        const dateString = `${date.getMonth()}/${date.getDate()}/${date.getFullYear()}`;

        if (weeksToDownloads.has(dateString)) {
            console.log(`Error - same week found multiple times in database: ${dateString}`);
        } else {
            const downloadLink = `${BASE_URL}/get_csvstring/week/${weeksArray[i]}`;
            insertNewRow(dateString, downloadLink);
            weeksToDownloads.add(dateString);
        }
    }
}

build();
