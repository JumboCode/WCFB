const BASE_URL = 'http://localhost:3000';

async function downloadCsv(weekNum, linkId) {
    console.log('hi');
    const response = await fetch(`${BASE_URL}/get_csvstring/week/${weekNum}`);
    const responseJson = await response.json();
    const content = await responseJson.csv;

    const file = new Blob([content], { type: 'csv' });
    const link = document.getElementById(linkId);
    link.href = URL.createObjectURL(file);
    link.download = `${weekNum}.csv`;
}

function getDownloadMap(weeksArray) {
    const weeksToDownloads = new Map();
    for (let i = 0; i < weeksArray.length; i++) {
        const currDate = new Date(weeksArray[i]);
        const day = currDate.getDate();
        const month = currDate.getMonth();
        const year = currDate.getFullYear();
        const dateString = `${day}/${month}/${year}`;

        if (weeksToDownloads.has(dateString)) {
            console.log(`Error - same week found multiple times in database: ${dateString}`);
        } else {
            const link = document.getElementById('use_for_download');
            // use anonomous function so downloadCsv is not triggered on page load
            link.onclick = function () { downloadCsv(weeksArray[i], 'use_for_download'); };
            const downloadLink = `${BASE_URL}/get_csvstring/week/${weeksArray[i]}`;
            weeksToDownloads.set(dateString, downloadLink);
        }
    }

    return weeksToDownloads;
}

async function build() {
    const weeksResponse = await fetch(`${BASE_URL}/get_weeks`);
    const weeksJson = await weeksResponse.json();
    const weeksArray = await weeksJson.weeks.filter(x => x != null);

    const weeksToDownloads = getDownloadMap(weeksArray);
    weeksToDownloads.forEach((link, week) => console.log(`${week}: ${link}`));
}

console.log('testing');
build();
console.log('done building');
