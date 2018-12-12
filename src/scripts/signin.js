
/* 
Local storage is holding: 
    'csv' - the CSV with all the possible volunteers to check against/for autocomplete 
    'name' - each person who is currently signed in and working 
*/

/* ARTIFICAL CODE UNTIL CAN CONNECT TO CSV*/
function fake() {
    var arr = ["Alice Dempsey", "Alice Christina", "Alice", "Lulu", "Patrick", "Trisha"]
    arr = JSON.stringify(arr);
    localStorage.setItem('csv', arr);
}
/* END OF ARTIFICAL CODE UNTIL CAN CONNECT TO CSV*/

var startTime;

function val_getter_1(a) {
	return a.value
}

var INPUTS =
{
	'VNAME_SIGNIN': {
		'id': 'sign_in_input',
		'input_id': 'VNAME_INPUT_SIGNIN',
		'val_getter': val_getter_1
	}
}

var ls_counter = 0; 

function submitForm() {
    info = document.getElementById("VNAME_SIGNIN").value
    var csv_info = localStorage.getItem('csvIn'); 
    var dict2 = ReadCSV(csv_info)
    var arr = dict2.get_Names();  
    if(arr.includes(info)) {
        window.alert("Submitted")
        store(info); 
        window.location.href = "login_logout_page.html";
    }else{
        window.alert("I'm sorry, you're not in the system!")
    }    
}

function store(name) {
    var today = new Date();
    var date = (today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes();
    var dateTime = date+' '+time;
    var id = // USE harsh and sophia's get_id function from their branch?? they need the id later
    person = {"name": name, "login_time": today};
    person = JSON.stringify(person);
    localStorage.setItem(name, person);
    // startTime = new Date();
    // localStorage.setItem(name, startTime);
}

function autocomplete(inp) {
    var csv_info = localStorage.getItem('csvIn'); 
    var dict2 = ReadCSV(csv_info)
    var arr = dict2.get_Names(); 
    var currentFocus;
    inp.addEventListener("input", function(e) {
        var a, b, i, val = this.value;
        closeAllLists();
        if (!val) { return false;}
        currentFocus = -1;
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        this.parentNode.appendChild(a);
        for (i = 0; i < arr.length; i++) {
            if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
                b = document.createElement("DIV");
                b.setAttribute("class", "one-item");
                b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
                b.innerHTML += arr[i].substr(val.length);
                b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
                b.addEventListener("click", function(e) {
                    inp.value = this.getElementsByTagName("input")[0].value;
                    closeAllLists();
              });
            a.appendChild(b);
            }
        }
  });
    inp.addEventListener("keydown", function(e) {
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
            currentFocus++;
            addActive(x);
        } else if (e.keyCode == 38) { 
            currentFocus--;
            addActive(x);
        } else if (e.keyCode == 13) {
            e.preventDefault();
        if (currentFocus > -1) {
            if (x) x[currentFocus].click();
        }
    }
  });

function addActive(x) {
    if (!x) return false;
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = (x.length - 1);
    x[currentFocus].classList.add("autocomplete-active");
}

function removeActive(x) {
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
}

function closeAllLists(elmnt) {
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
      x[i].parentNode.removeChild(x[i]);
    }
  }
}
document.addEventListener("click", function (e) {
    closeAllLists(e.target);
});
	console.log(info)
	window.location.href = "login_logout_page.html";
}
// 	var info = {}
// 		for (let i in INPUTS) {
// 			info[i] = INPUTS[i]['val']
// 		}

// 	start(info.VNAME_SIGNIN);
// 	console.log(info)
// }


function start(name) {
		startTime = new Date();
		localStorage.setItem(name, startTime);
		console.log("GOING IN: " + name)
}

function ReadCSV(data) {
    //parse the csv first using split /n and then comma
    //build dictionary based off of that

    var allTextLines = data.split(/\r\n|\n/);
    var headers = allTextLines[0].split(',');
    var lines = [];
    var dict2 = new Dictionary();

    for (var i=1; i<allTextLines.length; i++) {
        var data = allTextLines[i].split(',');
        if (data.length == headers.length) {
            dict2.add(data[0], data[1]);
        }
    }
    console.log(dict2);
    return dict2;
}


function Dictionary() {
    this.sets = [];

    this.add = function(name, id) {
        if (name && id) {
            this.sets.push({
                VNAME: name,
                donor_id: id
            });
            return this.sets;
        }
    }

    this.findID = function(name) {
        for (var i = 0; i < this.sets.length; i++) {
            if (this.sets[i].VNAME == name) {
                return this.sets[i].donor_id;
            }
        }
        return this.sets;
    }

    this.removeUser = function(name) {
        for (var i = 0; i < this.sets.length; i++) {
            if (this.sets[i].VNAME == name) {
                this.sets[i].splice(this.sets[i], 1);
            }
        }
        return this.sets;
    }

    this.get_Names = function() {
        var arr = [];
        for(var i = 0; i < this.sets.length; i++) {
            arr.push(this.sets[i].VNAME)
        }
        return arr; 
    }
}
