function store() {
	activity = document.getElementById("activity").value;
	name = document.getElementById("name").value;
	var today = new Date();
	var date = (today.getMonth()+1)+'-'+today.getDate();
	var time = today.getHours() + ":" + today.getMinutes();
	var dateTime = date+' '+time;
	var person = {"name": name, "login_time": dateTime, 
	"activity": activity};
	person = JSON.stringify(person);
	localStorage[new Date().getTime()] = person;
}