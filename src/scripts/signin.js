function val_getter_2(a) {
    return document.getElementById("VNAME_SIGNIN")
}

var INPUTS = 
{
    'VNAME_SIGNIN': {
        'id': 'VNAME_SIGNIN',
        'input_id': 'VNAME_INPUT_SIGNIN',
        'val_getter': val_getter_2,
    }
}

function submitForm() {

    // for (let i in INPUTS) {
    //     INPUTS[i]['html_element'] = document.getElementById(INPUTS[i]['id'])
    //     INPUTS[i]['val'] = INPUTS[i]['val_getter'](INPUTS[i]['html_element'])

    //     INPUTS[i]['html_element_input'] = document.getElementById(INPUTS[i]['input_id'])
    // }

    // var info = {}
    //     for (let i in INPUTS) {
    //         info[i] = INPUTS[i]['val']
    //     }

    info = document.getElementById("VNAME_SIGNIN").value

    var arr = ["Alice Dempsey", "Alice Christina", "Alice", "Lulu", "Patrick", "Trisha"]
    if(arr.includes(info)) {
        window.alert("Submitted")
        store(); 
        window.location.href = "login_logout_page.html";
    }else{
        window.alert("I'm sorry, you're not in the system!")
    }    

    console.log(info)
}

function store(name) {
    var today = new Date();
    var date = (today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes();
    var dateTime = date+' '+time;
    var person = {"name": name, "login_time": dateTime};
    person = JSON.stringify(person);
    localStorage[new Date().getTime()] = person;
}

function autocomplete(inp) {
// FIX THIS: ARTIFICAL NAME LIST FOR TESTING ONLY  
    var arr = ["Alice Dempsey", "Alice Christina", "Alice", "Lulu", "Patrick", "Trisha"]
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
}
