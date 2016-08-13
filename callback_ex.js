const readline = require('readline');
const reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function Clock() {
  let date = new Date();
  this.hours = date.getHours();
  this.minutes = date.getMinutes();
  this.seconds = date.getSeconds();
}

Clock.prototype._tick = function() {
  this.seconds += 1;

  if (this.seconds >= 60) {
    this.minutes += 1;
    this.seconds = 0;
  }
  if (this.minutes >= 60) {
    this.hours += 1;
    this.minutes = 0;
  }

  this.printTime();
};

Clock.prototype.printTime = function() {
  var time = `${this.hours}:${this.minutes}:${this.seconds}`;
  console.log(time);
};

// -----------------------------------------------

function addNumbers(sum, numsLeft, completionCallback) {

  if (numsLeft === 0) {
    completionCallback(sum);
    return;
  }

  reader.question("Enter your number", function (answer) {
    sum += parseInt(answer);
    console.log(sum);
    addNumbers(sum, (numsLeft-1), completionCallback);
    reader.close();
  });

}

// addNumbers(0, 3, sum => console.log(`Total Sum: ${sum}`));

// ---------------------------------------------------

function askIfGreaterThan(el1, el2, callback) {
  reader.question(`Is ${el1} greater than ${el2}?`, function(answer) {
    console.log("got here");
    if (answer === "yes") {
      console.log("answer is yes");
      callback(true);
    } else {
      console.log("answer is no");
      callback(false);
    }
  });
}

function innerBubbleSortLoop(arr, i, madeAnySwaps, outerBubbleSortLoop) {
  console.log(arr);
  if (i < arr.length - 1) {
    console.log("i", i);
    askIfGreaterThan(arr[i], arr[i+1], (isGreaterThan) => {
      if (!isGreaterThan) {
        innerBubbleSortLoop(arr, i+1, madeAnySwaps, outerBubbleSortLoop);
        return;
      }

      let temp = arr[i];
      arr[i] = arr[i + 1];
      arr[i + 1] = temp;
      innerBubbleSortLoop(arr, i+1, true, outerBubbleSortLoop);
    });

  } else {
    outerBubbleSortLoop(madeAnySwaps);
  }
}

// innerBubbleSortLoop(arr, 0, false, (array) => console.log(array));

// askIfGreaterThan(1, 2, (boolean) => console.log(boolean));

function absurdBubbleSort(arr, sortCompletionCallback) {

  function outerBubbleSortLoop(madeAnySwaps) {
    if (madeAnySwaps) {
      innerBubbleSortLoop(arr, 0, false, outerBubbleSortLoop);
    } else {
      sortCompletionCallback(arr);
    }
  }

  innerBubbleSortLoop(arr, 0, false, outerBubbleSortLoop);
}
//
// absurdBubbleSort([3, 2, 1], function (arr) {
//   console.log("Sorted array: " + JSON.stringify(arr));
//   reader.close();
// });

// ---------------------------------------------------

Function.prototype.myBind = function(context) {
  return () => {
    this.apply(context);
  };
};

class Lamp {
  constructor() {
    this.name = "a lamp";
  }
}

const turnOn = function() {
   console.log("Turning on " + this.name);
};

const lamp = new Lamp();

turnOn(); // should not work the way we want it to

const boundTurnOn = turnOn.bind(lamp);
const myBoundTurnOn = turnOn.myBind(lamp);

boundTurnOn(); // should say "Turning on a lamp"
myBoundTurnOn(); // should say "Turning on a lamp"


module.exports = Clock;
