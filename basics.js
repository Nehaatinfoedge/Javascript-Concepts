/*“John is running fast because John is trying to catch the train.
” We don’t reuse “John” in this manner, for if we do, our family, friends, and colleagues would 
abandon us. Yes, they would. Well, maybe not your family, 
but those of us with fair-weather friends and colleagues. In a similar graceful manner, 
in JavaScript, we use the this keyword as a shortcut, a referent; it refers to an object; 
that is, the subject in context, or the subject of the executing code. Consider this example:*/
var person = {
    firstName: "Penelope",
    lastName: "Barrymore",
    fullName: function () {
        ​// Notice we use "this" just as we used "he" in the example sentence earlier?:​
        console.log(this.firstName + " " + this.lastName);
    ​// We could have also written this:​​
        console.log(person.firstName + " " + person.lastName);
    }
}
/*If we use person.firstName and person.lastName, as in the last example, 
our code becomes ambiguous. Consider that there could be another global variable 
(that we might or might not be aware of) with the name “person.” Then, references to 
person.firstName could attempt to access the firstName property from the person global variable, 
and this could lead to difficult-to-debug errors. So we use the “this” keyword not only for 
aesthetics (i.e., as a referent), but also for precision; its use actually makes our code more 
unambiguous, just as the pronoun “he” made our sentence more clear. 
It tells us that we are referring to the specific John at the beginning of the sentence.*/

/*First, know that all functions in JavaScript have properties, just as objects have properties.
And when a function executes, it gets the this property—
a variable with the value of the object that invokes the function where this is used
when we use strict mode, this holds the value of undefined in global functions 
and in anonymous functions that are not bound to any object.*/

/*The use of this in the global scope*/
/*In the global scope, when the code is executing in the browser, 
all global variables and functions are defined on the window object. 
Therefore, when we use this in a global function, it refers to (and has the value of) the global 
window object (not in strict mode though, as noted earlier) that is the main container of the 
entire JavaScript application or web page.*/

var firstName = "Peter",
lastName = "Ally";
​
function showFullName () {
// "this" inside this function will have the value of the window object​
// because the showFullName () function is defined in the global scope, just like the firstName and lastName​
console.log (this.firstName + " " + this.lastName);
}
​
var person = {
	firstName   :"Penelope",
	lastName    :"Barrymore",
	showFullName:function () {
		// "this" on the line below refers to the person object, because the showFullName function will be invoked by person object.​
		console.log (this.firstName + " " + this.lastName);
	}
}
​
showFullName (); // Peter Ally​
​
// window is the object that all global variables and functions are defined on, hence:​
window.showFullName (); // Peter Ally​
​
// "this" inside the showFullName () method that is defined inside the person object still refers to the person object, hence:​
person.showFullName (); // Penelope Barrymore

var person = {
   firstName   :"Penelope",
   lastName    :"Barrymore",
   showFullName:function () {
​// The "context"​
console.log (this.firstName + " " + this.lastName);
 }
}
	​
​// The "context", when invoking showFullName, is the person object, when we invoke the showFullName () method on the person object.​
​// And the use of "this" inside the showFullName() method has the value of the person object,​
person.showFullName (); // Penelope Barrymore​
​
​// If we invoke showFullName with a different object:​
​var anotherPerson = {
firstName   :"Rohit",
lastName    :"Khan"​
};
​
​// We can use the apply method to set the "this" value explicitly—more on the apply () method later.​
​// "this" gets the value of whichever object invokes the "this" Function, hence:​
person.showFullName.apply (anotherPerson); // Rohit Khan​
​
​// So the context is now anotherPerson because anotherPerson invoked the person.showFullName ()  method by virtue of using the apply () method

/*The takeaway is that the object that invokes the this Function is in context, 
and we can change the context by invoking the this Function with another object; then this new 
object is in context.*/

// We have a simple object with a clickHandler method that we want to use when a button on the page is clicked​
var user = {
	data:[
		{name:"T. Woods", age:37},
		{name:"P. Mickelson", age:43}
	],
	clickHandler:function (event) {
		var randomNum = ((Math.random () * 2 | 0) + 1) - 1; // random number between 0 and 1​
		​
		// This line is printing a random person's name and age from the data array​
		console.log (this.data[randomNum].name + " " + this.data[randomNum].age);
	}
}
​
// The button is wrapped inside a jQuery $ wrapper, so it is now a jQuery object​
// And the output will be undefined because there is no data property on the button object​
$ ("button").click (user.clickHandler); // Cannot read property '0' of undefined

/* In the code above, since the button ($(“button”)) is an object on its own, 
and we are passing the user.clickHandler method to its click() method as a callback, 
we know that this inside our user.clickHandler method will no longer refer to the user object. 
this will now refer to the object where the user.clickHandler method is executed because this 
is defined inside the user.clickHandler method. And the object that is invoking user.clickHandler 
is the button object—user.clickHandler will be executed inside the button object’s click method.

Note that even though we are calling the clickHandler () method with user.clickHandler 
(which we have to do, since clickHandler is a method defined on user), the clickHandler () 
method itself will be executed with the button object as the context to which “this” now refers. 
So this now refers to is the button ($(“button”)) object.*/

/*Solution to fix this when a method is passed as a callback function:
Since we really want this.data to refer to the data property on the user object,
 we can use the Bind (), Apply (), or Call () method to specifically set the value of this.*/

 $("button").click (user.clickHandler.bind (user));

 /*We use the Bind () method primarily to call a function with the this value set explicitly. 
 It other words, bind () allows us to easily set which specific object will be bound to this 
 when a function or method is invoked.*/

 // This data variable is a global variable​
var data = [
    {name:"Samantha", age:12},
    {name:"Alexis", age:14}
]
​
var user = {
    // local data variable​
    data    :[
        {name:"T. Woods", age:37},
        {name:"P. Mickelson", age:43}
    ],
    showData:function (event) {
        var randomNum = ((Math.random () * 2 | 0) + 1) - 1; // random number between 0 and 1​
​
        console.log (this.data[randomNum].name + " " + this.data[randomNum].age);
    }
​
}
​
// Assign the showData method of the user object to a variable​
var showDataVar = user.showData;
​
showDataVar (); // Samantha 12 (from the global data array, not from the local data array)​

/*When we execute the showDataVar () function, the values printed to the console are 
from the global data array, not the data array in the user object. This happens because 
showDataVar () is executed as a global function and use of this inside showDataVar () is 
bound to the global scope, which is the window object in browsers.*/


 // Bind the showData method to the user object​
var showDataVar = user.showData.bind (user);
​
// Now the we get the value from the user object because the this keyword is bound to the user object​
showDataVar (); // P. Mickelson 43​


/*In JavaScript, we can pass functions around, return them, borrow them, and the like. 
And the bind () method makes it super easy to borrow methods.*/

// Here we have a cars object that does not have a method to print its data to the console​
var cars = {
    data:[
        {name:"Honda Accord", age:14},
        {name:"Tesla Model S", age:2}
    ]
​
}
​
// We can borrow the showData () method from the user object we defined in the last example.​
// Here we bind the user.showData method to the cars object we just created.​
cars.showData = user.showData.bind (cars);
cars.showData (); // Honda Accord 14​

/*One problem with this example is that we are adding a new method (showData) on 
the cars object and we might not want to do that just to borrow a method because the cars object
 might already have a property or method name showData. We don’t want to overwrite it 
 accidentally. It is best to borrow a method using either the Apply or Call method.*/

 /*JavaScript’s Apply and Call Methods*/
 /*The Apply and Call methods are two of the most often used Function methods in JavaScript, 
 and for good reason: they allow us to borrow functions and set the this value in function 
 invocation. In addition, the apply function in particular allows us to execute a function 
 with an array of parameters, such that each parameter is passed to the function individually 
 when the function executes—great for variadic functions; a variadic function takes varying 
 number of arguments, not a set number of arguments as most functions do.*/

 // global variable for demonstration​
var avgScore = "global avgScore";
​
//global function​
function avg (arrayOfScores) {
    // Add all the scores and return the total​
    var sumOfScores = arrayOfScores.reduce (function (prev, cur, index, array) {
        return prev + cur;
    });
​
    // The "this" keyword here will be bound to the global object, unless we set the "this" with Call or Apply​
    this.avgScore = sumOfScores / arrayOfScores.length;
}
​
var gameController = {
    scores  :[20, 34, 55, 46, 77],
    avgScore:null​
}
​
// If we execute the avg function thus, "this" inside the function is bound to the global window object:​
avg (gameController.scores);
// Proof that the avgScore was set on the global window object​
console.log (window.avgScore); // 46.4​
console.log (gameController.avgScore); // null​
​
// reset the global avgScore​
avgScore = "global avgScore";
​
// To set the "this" value explicitly, so that "this" is bound to the gameController,​
// We use the call () method:​
avg.call (gameController, gameController.scores);
​
console.log (window.avgScore); //global avgScore​
console.log (gameController.avgScore); // 46.4​

/* Note that the first argument to call () sets the this value. In the preceding example, it is set to
the gameController object. The other arguments after the first argument are passed as parameters to the
avg () function.

The apply and call methods are almost identical when setting the this value except that you 
pass the function parameters to apply () as an array, while you have to list the parameters 
individually to pass them to the call () method.*/

// Define an object with some properties and a method​
// We will later pass the method as a callback function to another function​
var clientData = {
	id: 094545,
	fullName: "Not Set",
		// setUserName is a method on the clientData object​
	setUserName: function (firstName, lastName)  {
		// this refers to the fullName property in this object​
		this.fullName = firstName + " " + lastName;
	}
}

function getUserInput (firstName, lastName, callback, callbackObj) {
    // The use of the Apply method below will set the "this" value to callbackObj​
    callback.apply (callbackObj, [firstName, lastName]);
}

// The clientData object will be used by the Apply method to set the "this" value​
getUserInput ("Barack", "Obama", clientData.setUserName, clientData);
// the fullName property on the clientData was correctly set​
console.log (clientData.fullName); // Barack Obama​



/*JavaScript’s Bind Allows Us to Curry a Function */

function greet (gender, age, name) {
    // if a male, use Mr., else use Ms.​
    var salutation = gender === "male" ? "Mr. " : "Ms. ";
​
    if (age > 25) {
        return "Hello, " + salutation + name + ".";
    }
    else {
        return "Hey, " + name + ".";
    }
}
 // So we are passing null because we are not using the "this" keyword in our greet function.​
var greetAnAdultMale = greet.bind (null, "male", 45);
​
greetAnAdultMale ("John Hartlove"); // "Hello, Mr. John Hartlove."​
​
var greetAYoungster = greet.bind (null, "", 16);
greetAYoungster ("Alex"); // "Hey, Alex."​
greetAYoungster ("Emma Waterloo"); // "Hey, Emma Waterloo."​


/*An array-like object is an object that has its keys defined as non-negative integers. 
It is best to specifically add a length property on the object that has the length of the object,
 since the a length property does not exist on objects it does on Arrays.*/

 /*Array.prototype.slice—the slice method that is defined on the Array prototype.*/
 /*Let’s create an array-like object and borrow some array methods to operate on the our 
 array-like object. Keep in mind the array-like object is a real object, it is not an array 
 at all:*/

 // An array-like object: note the non-negative integers used as keys​
var anArrayLikeObj = {0:"Martin", 1:78, 2:67, 3:["Letta", "Marieta", "Pauline"], length:4 };
// Make a quick copy and save the results in a real array:​
// First parameter sets the "this" value​
var newArray = Array.prototype.slice.call (anArrayLikeObj, 0);
​
console.log (newArray); // ["Martin", 78, 67, Array[3]]​
​
// Search for "Martin" in the array-like object​
console.log (Array.prototype.indexOf.call (anArrayLikeObj, "Martin") === -1 ? false : true); // true​
​
// Try using an Array method without the call () or apply ()​
console.log (anArrayLikeObj.indexOf ("Martin") === -1 ? false : true); // Error: Object has no method 'indexOf'​
​
// Reverse the object:​
console.log (Array.prototype.reverse.call (anArrayLikeObj));
// {0: Array[3], 1: 67, 2: 78, 3: "Martin", length: 4}​
​
// Sweet. We can pop too:​
console.log (Array.prototype.pop.call (anArrayLikeObj));
console.log (anArrayLikeObj); // {0: Array[3], 1: 67, 2: 78, length: 3}​
​
// What about push?​
console.log (Array.prototype.push.call (anArrayLikeObj, "Jackie"));
console.log (anArrayLikeObj); // {0: Array[3], 1: 67, 2: 78, 3: "Jackie", length: 4}​

 var gameController = {
    scores  :[20, 34, 55, 46, 77],
    avgScore:null,
    players :[
        {name:"Tommy", playerID:987, age:23},
        {name:"Pau", playerID:87, age:33}
    ]
}
​
var appController = {
    scores  :[900, 845, 809, 950],
    avgScore:null,
    avg     :function () {
​
        var sumOfScores = this.scores.reduce (function (prev, cur, index, array) {
            return prev + cur;
        });
​
        this.avgScore = sumOfScores / this.scores.length;
    }
}
​
// Note that we are using the apply () method, so the 2nd argument has to be an array​
appController.avg.apply (gameController);
console.log (gameController.avgScore); // 46.4​
​
// appController.avgScore is still null; it was not updated, only gameController.avgScore was updated​
console.log (appController.avgScore); // null​

