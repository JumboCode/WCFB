function store(name) {
	var today = new Date();
	var date = (today.getMonth()+1)+'-'+today.getDate();
	var time = today.getHours() + ":" + today.getMinutes();
	var dateTime = date+' '+time;
	var person = {"name": name, "login_time": dateTime};
	person = JSON.stringify(person);
	localStorage[new Date().getTime()] = person;
}