// buildEmailPreferences.js
// Builds the table in the email-preferences page
// Links certain elements to methods that update the email list

/* const BASE_URL = 'https://wcfb-signin.herokuapp.com'; */
const BASE_URL = 'http://localhost:3000';

/* ************************************* */
/* Helper Functions - Server Interaction */
/* ************************************* */

// Returns an array of emails currently stored in the server
async function getEmails() {
    const emailsResponse = await fetch(`${BASE_URL}/get_emails`);
    const emailsJson = await emailsResponse.json();
    const emails = await emailsJson.emails;
    return emails;
}

// Adds the email to the list in the server and updates the table
async function addEmail(email) {
    const emails = await getEmails();
    if (emails.indexOf(email) > -1) {
        alert('Email already in list');
    } else {
        const response = await fetch(`${BASE_URL}/add_email`, {
            method: 'POST',
            body: JSON.stringify({ email }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        build();
    }
}

// Takes in an event (eg. from onclick) associated with an table cell
//    that has a dataset identifying an email
// Removes the email from the server and updates the table
async function deleteEmail(event) {
    const email = event.target.dataset.email;
    if (email == null) {
        alert('Error deleting email');
    } else {
        const response = await fetch(`${BASE_URL}/remove_email`, {
            method: 'POST',
            body: JSON.stringify({ email }),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        build();
    }
}

/* ********************************* */
/* Helper Functions - UI Interaction */
/* ********************************* */

// Inserts a new row into the csv-download-table
// with the week and link passed as parameters
function insertNewRow(email) {
    const table = document.getElementById('email-table');
    const row = table.insertRow(-1);
    const emailCell = row.insertCell(0);
    const xCell = row.insertCell(1);
    xCell.className = 'xCell';
    xCell.dataset.email = email; // store the corresponding email in the "x" for easy deletion
    xCell.onclick = deleteEmail;
    xCell.innerHTML = 'x';
    emailCell.innerHTML = email;
}

// Build the table from updated data fetched from the server
async function build() {
    // clear the table of old data by deleting rows
    const table = document.getElementById('email-table');
    while (table.rows.length > 1) { // keep header
        table.deleteRow(-1);
    }

    // build table from new data
    const emails = await getEmails();
    for (let i = 0; i < emails.length; i += 1) {
        insertNewRow(emails[i]);
    }
}

/* ************* */
/* "Main Method" */
/* ************* */

// Link the input field to the add email to the table
document.getElementById('add-email').onkeydown = (e) => {
    if (e.key == 'Enter') {
        const elem = e.srcElement || e.target;
        addEmail(elem.value); // start async call, but there is no reason to await
        elem.value = '';
    }
};

build();
