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
}

module.exports = Dictionary;


// var workers = new Dictionary();
// workers.add('Bob', 12345);
// workers.add('Bob1', 1232345);
// workers.add('Bob2', 123542345);
// workers.add('Bob3', 1233224345);
// workers.add('Bob4', 12452342345);
// workers.add('Bob5', 123264345);
// workers.add('Bob6', 12372345);
// workers.add('Bob7', 12341345);
// console.log(workers.findID('Bob7'));
