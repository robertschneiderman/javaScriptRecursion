function Board() {
  // this.grid = this.grid.map((row) => {
  //   return new Array(3);
  // });
  this.grid = this.makeSets();
}

Board.prototype.isWon = function() {
  let sets = this.rows().concat(this.columns()).concat(this.diagonals());
  // console.log(sets);
  let result = false;

  sets.forEach(function(set) {
    let res = set.every(function(space) {
      return (space === 'X' || space === 'O');
    });
    // console.log(res);
    result = result || res;
  });

  return result;
};

Board.prototype.rows = function () {
  return this.grid;
};

Board.prototype.columns = function () {
  let cols = this.makeSets();

  this.grid.forEach(function(row, y) {
    row.forEach(function(col, x) {
      cols[x][y] = row[y][x];
    });
  });

  return cols;
};

Board.prototype.diagonals = function () {
  function makeDiagonal(startPos, dir) {
    let diagonal = [];
    let pos = startPos;


    for (let i = 0; i < 3; i++) {
      let x = pos[0];
      let y = pos[1];

      console.log(this.grid);

      diagonal.push(this.grid[x][y]);

      pos = [x + dir[0], y + dir[1]];
    }

    return diagonal;
  }

  return [makeDiagonal.call(this, [0, 0], [1, 1]),
          makeDiagonal.call(this, [0, 2], [1, -1])];
};

Board.prototype.winner = function () {

};

Board.prototype.isEmpty = function (pos) {

};

Board.prototype.placeMark = function (pos, mark) {

};

Board.prototype.makeSets = function () {
  let sets = new Array(3);
  for (let i = 0; i < sets.length; i++) {
    sets[i] = new Array(3);
  }
  return sets;
};

let game = new Board();
console.log(game.isWon());
