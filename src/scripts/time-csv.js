const TIME_TO_CHECK = 86400000;

// Writes the current time into local storage
function UpdateTimeSinceImport(){
    var currentTime = new Date();
    var currentMilliseconds = currentTime.getTime();
    localStorage.setItem("time", currentMilliseconds);
}

// Checks whether TIME_TO_CHECK has elapsed since last import
function CheckLastImport(){
    var last_import = localStorage.getItem("time");
    var curr_time = new Date();
    var curr_millis = curr_time.getTime();

    return (curr_millis - TIME_TO_CHECK >= last_import);
}

// Pulls up import page if needed
function DisplayImportPage(){
    var update_page = CheckLastImport();

    if(update_page){
        //pull up page
        UpdateTimeSinceImport();
    }
    else{
        //don't do stuff
    }
}

DisplayImportPage();
