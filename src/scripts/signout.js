const testCSV = localStorage.getItem('csvOut');
const dict2 = new Dictionary();

let page_state = 0;

function val_getter_1(a) {
    return a.value;
}

function val_getter_2(a) {
    console.log(a.options[a.selectedIndex].text);
    return a.options[a.selectedIndex].text;
}

const INPUTS = {
    VNAME: {
        id: 'VNAME',
        input_id: 'VNAME_INPUT',
        val_getter: val_getter_2,
    },
    WCOMM: {
        id: 'comments',
        input_id: 'WCOMM_INPUT',
        val_getter: val_getter_1,
    },
    // 'OCOMM': {
    // 	'id': 'OCOMM',
    // 	'input_id': 'OCOMM_INPUT',
    // 	'val_getter': val_getter_1,
    // },
    VPROJ: {
        id: 'VPROJ',
        input_id: 'VPROJ_INPUT',
        val_getter: val_getter_2,
    },
};

function cancel() {
    page_state = 0;
    const cancel_button = document.getElementById('CANCEL');

    const submit_button = document.getElementById('submit_button');
    submit_button.innerHTML = 'Submit';
    cancel_button.style.display = 'none';
    location.href = 'login_logout_page.html';
}


function submitForm() {
    const cancel_button = document.getElementById('CANCEL');

    for (const i in INPUTS) {
        INPUTS[i].html_element = document.getElementById(INPUTS[i].id);
        INPUTS[i].val = INPUTS[i].val_getter(INPUTS[i].html_element);

        INPUTS[i].html_element_input = document.getElementById(INPUTS[i].input_id);
    }

    if (page_state == 0) {
        page_state = 1;

        var submit_button = document.getElementById('submit_button');
        submit_button.innerHTML = 'Confirm?';
        cancel_button.style.display = 'block';
    } else {
        page_state = 0;

        var submit_button = document.getElementById('submit_button');
        submit_button.innerHTML = 'Submit';

        const info = {};
        for (const i in INPUTS) {
            info[i] = INPUTS[i].val;
        }
        const csvInfo = localStorage.getItem('csvIn');
        ReadCSV(csvInfo);
        info.ID = dict2.findID(info.VNAME);

        const user = localStorage.getItem(info.VNAME);
        info.LOGIN = JSON.parse(user).login_time;

        const today = new Date();
    	const date = `${today.getMonth() + 1}-${today.getDate()}-${today.getYear() + 1900}`;
    	const time = `${today.getHours()}:${today.getMinutes()}`;
    	const writeDate = date;
    	const writeTime = time;
    	info.DATE = writeDate;
    	info.LOGOUTTIME = writeTime;

    	name = 'Logout';
    	person = { name, logout_time: writeDate };
    	person = JSON.stringify(person);
    	localStorage.setItem(name, person);

        info.HOURSWORKED = calcTime(info.VNAME);

        WriteCSV(info, sendData);

        delete_name(INPUTS.VNAME.val);
        console.log(info);
        window.location.href = 'login_logout_page.html';
    }
}

function sendData(serverData) {
    postData('http://localhost:3000/example/c', { serverData })
	  			// .then(data => console.log(JSON.stringify(data))) // JSON-string from `response.json()` call
	  			.catch(error => console.error(error));
    localStorage.setItem('server', 'done');
}

function postData(url = '', data = {}) {
    // Default options are marked with *
    return fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc. // no-cors, cors, *same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json',
            // "Content-Type": "application/x-www-form-urlencoded",
        },
        body: JSON.stringify(data), // body data type must match "Content-Type" header
    })
        .then(response => response.json()); // parses response to JSON
}

function generate_names() {
    console.log(localStorage);
    for (const i in localStorage) {
        if (i != 'csvIn' && i != 'time' && i != 'csvOut' && i != 'csv') {
            console.log(`${i}: ${localStorage.getItem(i)}`);
            const obj = JSON.parse(localStorage.getItem(i));
            if (obj != null) {
                document.getElementById('VNAME').innerHTML += `<option value=${obj.name}>${
					 obj.name}</option>`;
            }
        }
    }
}

function delete_name(name) {
    localStorage.removeItem(name);
}

function download_csv() {
    const csv = localStorage.getItem('csvOut');
    const hiddenElement = document.createElement('a');
    hiddenElement.href = `data:text/csv;charset=utf-8,${encodeURI(csv)}`;
    hiddenElement.target = '_blank';
    hiddenElement.download = 'testing.csv';
    hiddenElement.click();
    localStorage.clear('csvOut');
}

function WriteCSV(info, sendData) {
    let curr_csv = localStorage.getItem('csvOut');
    if (!curr_csv) {
        // console.log('headerCount is zero');
        const header = 'ID, Name, Comment, Other Comment, Project, Hours Worked, Date, Login Time, Logout Time\n';
        curr_csv = header;
    }
    let csvRow = '';
    csvRow += `${info.ID},`;
    csvRow += `${info.VNAME},`;
    csvRow += `${info.WCOMM},`;
    csvRow += `${info.OCOMM},`;
    csvRow += `${info.VPROJ},`;
    csvRow += `${info.HOURSWORKED},`;
    csvRow += `${info.DATE},`;
    csvRow += `${info.LOGIN},`;
    csvRow += info.LOGOUTTIME;
    csvRow += '\n';
    // console.log(csvRow);

    const new_csv = curr_csv + csvRow;
    localStorage.setItem('csvOut', new_csv);

    // Takes csv string and sends it to server
    sendData(new_csv);
}

function ReadCSV(data) {
    // parse the csv first using split /n and then comma
    // build dictionary based off of that

    const allTextLines = data.split(/\r\n|\n/);
    const headers = allTextLines[0].split(',');
    const lines = [];

    for (let i = 1; i < allTextLines.length; i++) {
        var data = allTextLines[i].split(',');
        if (data.length == headers.length) {
        	dict2.add(data[0], data[1]);
        }
    }
    // console.log(dict2);
}


function Dictionary() {
    this.sets = [];

    this.add = function (name, id) {
        if (name && id) {
            this.sets.push({
                VNAME: name,
                donor_id: id,
            });
            return this.sets;
        }
    };

    this.findID = function (name) {
        for (let i = 0; i < this.sets.length; i++) {
            if (this.sets[i].VNAME == name) {
                return this.sets[i].donor_id;
            }
        }
        return this.sets;
    };

    this.removeUser = function (name) {
        for (let i = 0; i < this.sets.length; i++) {
            if (this.sets[i].VNAME == name) {
                this.sets[i].splice(this.sets[i], 1);
            }
        }
        return this.sets;
    };
}

function calcTime(name) {
    startTime = localStorage.getItem(name);
    startTime = new Date(startTime);
    endTime = new Date();
    elapsedTime = endTime - startTime;
    elapsedTime /= 1000;
    final = hours(elapsedTime);
    console.log(final);
    return final;
}

function hours(d) {
    d = Number(d);
    let h = (d / 3600);
    h = Math.round(h * 100) / 100;
    return h;
}
