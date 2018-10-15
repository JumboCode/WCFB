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
