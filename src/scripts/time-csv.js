
function UpdateTimeSinceImport(){
  var currentTime = new Date();
  localStorage.setItem("time", currentTime);
  return;

}
function CheckLastImport(){
  console.log(localStorage.getItem("time"));
  return;
}
function DisplayImportPage(){
}

UpdateTimeSinceImport();
CheckLastImport();
