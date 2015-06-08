/**
 * [BoardService description]
 * @type {Object}
 */
  // This board service is not meant to be persistent.
  // Based on a single move it will return a new board along
  // with a score for that move.

GameBoardService = (function() {
  var noTouch = [];

  function GameBoardService(params) {
    params = params || {};

    // Data is [y][x]
    this.data = params.data || [];
    this.width = params.width || 4;
    this.height = params.height || 4;
    this.limit = params.limit || 2048;
    this.score = params.score || 0;

    this._addScore = function(val){
      this.score += val;
    }

    this._merge = function(curr, next){
      var currVal = this.data[curr.y][curr.x],
          nextVal = this.data[next.y][next.x];

      var newValue = nextVal * 2;
      this._addScore(newValue);

      this.data[curr.y][curr.x] = 0;
      this.data[next.y][next.x] = newValue;

      if(!noTouch[next.y]) noTouch[next.y] = [];
      noTouch[next.y][next.x] = true;
    }

    this._swap = function(curr, next){
      var currVal = this.data[curr.y][curr.x],
          nextVal = this.data[next.y][next.x];

      if(currVal === 0 || nextVal === 0){
        return 1;
      }

      if(noTouch[next.y] && noTouch[next.y][next.x] || currVal !== nextVal){
        return 0;
      }

      if(currVal === nextVal){
        return -1;
      }

      throw new Error("Should never reach this place. Please break a test!");
    },

    this._shiftDown = function(){
      for (var y = this.height - 2; y >= 0; y--) {
        for (var x = 0; x < this.width; x++) {
          if(!this.data[y][x]) continue;

          var count = y,
              swap = this._swap({y: count, x: x}, {y: count + 1, x: x});

          while(swap && swap !== -1){

            this.data[count + 1][x] = this.data[count][x];
            this.data[count][x] = 0;

            count++;
            if(count == this.height - 1) break;

            swap = this._swap({y: count, x: x}, {y: count + 1, x: x});
          }

          if(swap === -1){
            this._merge({y: count, x: x}, {y: count + 1, x: x});
          }

        };
      };
    }

    this._shiftUp = function(){
      for (var y = 1; y < this.height; y++) {
        for (var x = 0; x < this.width; x++) {
          if(!this.data[y][x]) continue;

          var count = y,
              swap = this._swap({y: count, x: x}, {y: count - 1, x: x});

          while(swap && swap !== -1){

            this.data[count - 1][x] = this.data[count][x];
            this.data[count][x] = 0;

            count--;
            if(count == 0) break;

            swap = this._swap({y: count, x: x}, {y: count - 1, x: x});
          }

          if(swap === -1){
            this._merge({y: count, x: x}, {y: count - 1, x: x});
          }

        };
      };
    }

    this._shiftRight = function(){
      // for (var y = 1; y < this.height; y++) {
      //   for (var x = 0; x < this.width; x++) {
      //     if(!this.data[y][x]) continue;

      //     var count = y,
      //         swap = this._swap({y: count, x: x}, {y: count - 1, x: x});

      //     while(swap && swap !== -1){

      //       this.data[count - 1][x] = this.data[count][x];
      //       this.data[count][x] = 0;

      //       count--;
      //       if(count == 0) break;

      //       swap = this._swap({y: count, x: x}, {y: count - 1, x: x});
      //     }

      //     if(swap === -1){
      //       this._merge({y: count, x: x}, {y: count - 1, x: x});
      //     }

      //   };
      // };
    }

  }

  GameBoardService.prototype.getScore = function() {
    return this.score;
  }

  GameBoardService.prototype.getData = function() {
    return this.data;
  }

  GameBoardService.prototype.shift = function(direction) {
    noTouch = [];
    switch(direction){
      case 'left':
        return this._shiftLeft();
        break;
      case 'up':
        return this._shiftUp();
        break;
      case 'right':
        return this._shiftRight();
        break;
      case 'down':
        return this._shiftDown();
        break;
      default:
        throw new Error("Invalid direction [" + direction + "] passed.");
        break;
    }

    return this.data;
  }

  return GameBoardService;
}());
