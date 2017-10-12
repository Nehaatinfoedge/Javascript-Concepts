var ageGroup = {30: "Children", 100:"Very Old"};
console.log(ageGroup.30) // This will throw an error​
​// This is how you will access the value of the property 30, to get value "Children"​
console.log(ageGroup["30"]); // Children​

// The primitive data type String is stored as a value​
​var person = "Kobe";  
​var anotherPerson = person; // anotherPerson = the value of person​
person = "Bryant"; // value of person changed​
​
console.log(anotherPerson); // Kobe​
console.log(person); // Bryant


var person = {name: "Kobe"};
​var anotherPerson = person;
person.name = "Bryant";
​
console.log(anotherPerson.name); // Bryant​
console.log(person.name); // Bryant

// This is an empty object initialized using the object literal notation​
​var myBooks = {};
​
​// This is an object with 4 items, again using object literal​
​var mango = {
	color: "yellow",
	shape: "round",
	sweetness: 8,
	​
	​howSweetAmI: function () {
		console.log("Hmm Hmm Good");
	}
}
var mango =  new Object ();
mango.color = "yellow";
mango.shape= "round";
mango.sweetness = 8;
​
mango.howSweetAmI = function () {
	console.log("Hmm Hmm Good");
}

