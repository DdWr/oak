var Node = require('./Node');

function Child(parent, value) {
	if(value == undefined) {
		return;
	}
	Node.call(this, "child", value.toString());
	this.parent = parent;
	this.value = value;
}

/* Set up prototype chain + constructor */
Child.prototype = new Node();
Child.prototype.constructor = Child;

module.exports = Child;