function Game () {
  this.stacks = [[1, 2, 3], [], []];
}

Game.prototype.promptMove = function(reader, callback) {
  this.print();

  reader.question("Where do you want to move FROM?", function(answer1) {
    reader.question("where do you want to move TO?", function(answer2) {
      let startTowerIdx = parseInt(answer1);
      let endTowerIdx = parseInt(answer2);
      callback(startTowerIdx, endTowerIdx);
    });
  });
};

Game.prototype.isValidMove = function(startTowerIdx, endTowerIdx) {
  let fromTower = this.stacks[startTowerIdx];
  let toTower = this.stacks[endTowerIdx];

  return (fromTower.length !== 0) &&
    (toTower.length === 0 || fromTower[0] < toTower[0]);
};


Game.prototype.move = function (startTowerIdx, endTowerIdx) {
  let fromTower = this.stacks[startTowerIdx];
  let toTower = this.stacks[endTowerIdx];

  if (this.isValidMove(startTowerIdx, endTowerIdx)) {
    let disk = fromTower.shift();
    toTower.unshift(disk);

    return;
  }

  throw "can't move to there";
};

Game.prototype.print = function() {
  console.log(JSON.stringify(this.stacks));
};

Game.prototype.isWon = function () {
  return (this.compareStacks(this.stacks[1]) ||
          this.compareStacks(this.stacks[2]));
};

Game.prototype.compareStacks = function(tower) {
  return tower.every(function(disk, idx) {
    return disk === idx + 1;
  }) && tower.length === 3;
};

Game.prototype.run = function(reader, completionCallback) {
  this.promptMove(reader, (startTowerIdx, endTowerIdx) => {
    this.move(startTowerIdx, endTowerIdx);

    if (this.isWon()) {
      completionCallback();
    } else {
      this.run(reader, completionCallback);
    }
  });
};

module.exports = Game;
