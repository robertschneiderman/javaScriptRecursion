let Game = require('./game.js');
let game = new Game;


let readline = require('readline');
let reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let completionCallback = () => {
  reader.question("Do you want to play again?", function(answer) {
    if (answer === 'yes') {
      this.run();
    } else {
      console.log("Thanks for playing!");
      reader.close();
    }
  });
};

game.run(reader, completionCallback);
