/*
JS keywords: class, constructor, this, new, extends, super, get, set, static
patterns: prefix members with '#' to make them private 
terms: class, instance, attribute, method, member, public, private, data/accessor descriptor
*/


// What is a class?
/*
Fundamentally, a class is an object template. Classes can be used to template every little piece of your program (see any badly written Java code), but they are most useful when used to create higher-level equivalents of abstract data types and dangerous or confusing in most other situations. Therefore, our opinionated stance at Devhaus is that you should try to only use classes to implement higher-level abstract data types.
*/

// Examples of classes in JS
const myArray = [1, 2, 3, 4, 5]

myArray.push(6)
myArray.pop()


class Stack {
    // what are the values of my ADT? any value
    // operations: push, pop, length

    constructor() {
        this.length = 0;
        this.store = [];
    }

    pop() {
        this.length -= 1;
        return this.store.pop()
    }

    push(item) {
        this.length += 1;
        return this.store.push(item)
    }
}




// What is an abstract data type?
/*
It is a set of values and operations on those values. As long as the rules of the ADT as defined are respected, the implementation details are irrelevant.
*/

// Examples of ADTs


/*
If you look up ADTs online, you will generally only find examples of relatively low-level data structures like a stack, a map, or a binary search tree. However, we can extend the idea of an ADT for use with higher-level notions.


Example:
A box with balls in it that can move around and collide inelastically could be broken down into:
- an ADT for the box with values "some number of balls" and every "ball" and operations "add" a ball, "remove" a ball, and "testCollision" to see if a ball is intersecting with the boundaries of the box
- an ADT for a ball with the values "some position in the box", "some momentum vector" and the operations "move", "testCollision" to see if a ball intersects with the boundaries of another ball, and "transferMomentum" to exchange momentum between two balls that strike each other.


Example:
A canned food factory that takes in corn, beans, meat, and empty cans and produced canned food could be broken down into:
- an ADT for the factory with the values of "electricity", "corn", "beans", "meat", "empty cans", and further ones for each specific machine required, and then operations "receiveShipment", "sendShipment", "repairMachine", and "replaceMachine"
- an ADT for each machine, where one of them for example could have values "beans" and "corn" and "electricity" and the operations "load", "empty", and "cook"
*/



// Where should we not use classes?
/*
For any of the "wiring" or "piping" between things, or for the behavior of utilities or methods inside our classes and making them reuseable/very maintainable. This is where functional programming shines. Think of OOP as helping us make make and structure our 'things' and FP as helping us move them around, apply them to each other, and have them execute useful work. We'll learn more about FP concepts later.
*/



// the 'class' and 'constructor' keywords
// the 'this' keyword
// the 'new' keyword


class ToDoItem {
    title; // these declarations are optional usually
    taskDescription;
    deadline;
    isCompleted;

    constructor(title, description, deadline) {
        this.title = title;
        this.taskDescription = description;
        this.deadline = deadline;
        this.isCompleted = false;
    }

    complete(){
        console.log( `YAY! I finished ${this.title}!!!` )
        this.isCompleted = true;
    }

}

class ToDoList {

    constructor(ToDoItems = []) {
        this.arrayOfToDoItems = ToDoItems
    }

    howMany() {
        return this.arrayOfToDoItems.length
    }

    add(ToDoItem) {
        this.arrayOfToDoItems.push(ToDoItem)
    }

    getToDo(title) {
        return this.arrayOfToDoItems.find( (elem) => {
            return elem.title == title;
        } )
    }

    remove(title) {
        this.arrayOfToDoItems = this.arrayOfToDoItems.filter( (elem) => {
            if (elem.title === title) {
                if( !elem.isCompleted){
                    // throw new Error('NO! FINISH YOUR TASKS!')
                    console.log('NO! FINISH YOUR TASKS!')
                }
                return false
            }
            return true
        } )
    }
    
    checkDeadlines(date) {
        // compare date to ToDoItem.deadline for every ToDoItem in this.arrayOfToDoItems
    }

}

const initialToDos = [
    new ToDoItem(
        'Wash the dishes',
        'I need to wash the dishes or else mom will be mad.',
        'before bed'
    )
]

const myToDoList = new ToDoList(initialToDos)

myToDoList.add(new ToDoItem('play in the park', 'my friend timmy invited me to play tag', '1 hour'))

const playingInPark = myToDoList.getToDo('play in the park');


// playingInPark.complete()
myToDoList.remove('play in the park')

myToDoList.checkDeadlines('12:00')



// member, attribute vs. method, attribute vs. property

// attributes are values on a class, properties are values in an object/dictionary
// in JavaScript, attributes and properties are basically the same and no distinction is observed

// in other languages, like Python, it's different
// in Python:
// myDictionary['someKey'] // <-- only works if myDictionary is actually a dictionary
// myDictionary.someKey // <-- throws an error if someKey is not explicitly an attribute of the class, even if the dictionary has a key callled 'someKey'



class Human {


    constructor(head) {
        this.head = head;   // attribute
        this.body = "large";  // attribute
        this.legs = "long";  // attribute
    }

    walk() {   // method
    }

}

const franzHuman = new Human()

franzHuman.head // attribute
franzHuman.walk() // method



// the 'extends' and 'super' keywords

class Colorful {
    constructor(color){
        this.color = color;
    }

    beColorful() {
        console.log(`I'm a lovely shade of ${this.color}!`)
    }
}

const myColorfulThing = new Colorful('red')


class ColorfulAndShapely extends Colorful {
    constructor(color, shape) {
        super(color)
        this.shape = shape;
    }

    beColorfulAndShapely() {
        console.log(`I'm a lovely shade of ${this.color} in this ${this.shape} world`)
    }
}

const niceThing = new ColorfulAndShapely('yellow', 'square')


niceThing.beColorful()
niceThing.beColorfulAndShapely()



// the 'get' and 'set' keywords, data vs. accessor descriptor
/*
A data descriptor is an attribute/property that has a value, which may or may not be writable. An accessor descriptor is an attribute/property described by a getter-setter pair of functions.

Getters and setters allow us to create an 'attribute' that is actually dynamically computed/created, so we can treat it like an normal attribute that can be read and assigned but extra any complicated logic can be hidden in the class.
*/


class WaitingRoom {
    constructor() {
        this.collectionOfPeople = {};
    }

    join(person) {
        // add person to line
    }

    get waitingOrder() {
        // do something to compute waitingOrder and return it
        return 'exampleList'
    }

    set waitingOrder(arg) {
        // use arg to modify WaitingRoom.collectionOfPeople and change waiting order
    }
}



// the 'static' keyword (class only members)

class NewColorful {
    static onlyOnClass = `I'm only available from the class`;

    constructor(color){
        this.color = color;
    }

    static beColorful() {
        console.log(`I'm only available from the class!`)
    }
}


const colorfulThingForMe = new NewColorful()

console.log( colorfulThingForMe.beColorful )

NewColorful.beColorful()



// private members

class ExampleClass {
    #privateAttr;

    constructor(arg){
        this.#privateAttr = arg;
        // in TypeScript
        // private this.color = color;
    }

    // in TypeScript
    // private exampleMethod
    #privateMethod() {
        console.log(`${this.#privateAttr}`)
        // in TypeScript
        // console.log(`${this.private}`)
    }
}

const myExample = new ExampleClass('test')

// these will throw an error because we're trying to use them outside of the class definition

// myExample.#private
// myExample.#privateMethod()