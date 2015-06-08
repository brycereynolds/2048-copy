// TODO Turn board into package
// TODO Workout namespacing
// 
var BOARD_ACTIVE = 'playingBoard';
Session.setDefault(BOARD_ACTIVE, false);

Session.set("MeteorToys_display", false)
Session.set(BOARD_ACTIVE, true)

var CURRENT_BOARD = 'activeBoard';
Session.set(CURRENT_BOARD, [
  [0,0,2,0],
  [4,0,0,0],
  [0,0,0,0],
  [0,0,0,8]
]);

Template.board.helpers({

  // B/c spacebars doesn't like playing with our 2d-array we turn it into a simple object
  cells: function () {
    var board = Session.get(CURRENT_BOARD);
    if(!board) return [];

    var boardAsObject = [];
    for (var y = 0; y < board.length; y++) {
      for (var x = 0; x < board[y].length; x++) {
        boardAsObject.push({x: x, y: y, value: board[y][x]});
      };
    };

    console.log("Board", boardAsObject);
    return boardAsObject;
  },
  hasValue: function(){
    return this.value > 0;
  }
});


console.log("GameBoardService?", GameBoardService);
// console.log("TestValue?", TestValue);

var KEYPRESS_LEFT = 37,
    KEYPRESS_UP = 38,
    KEYPRESS_RIGHT = 39,
    KEYPRESS_DOWN = 40;

Template.body.events({
  'keyup': function (e, data) {
    if(!Session.get(BOARD_ACTIVE)) return;

    // down = 40
    // up = 38
    // left = 37
    // right = 39

    if(e.which == KEYPRESS_DOWN){
      console.log("KEYPRESS", 'down');
      var board = Session.get(CURRENT_BOARD);

      // if(board[0].value != 2) return;

      // // Test change
      // board[0].value = 0;
      // board[4].value = 2;
      // Session.set(CURRENT_BOARD, board);
      // Tracker.flush();

      // board[4].value = 0;
      // board[8].value = 2;
      // Session.set(CURRENT_BOARD, board);
      // Tracker.flush();

      // board[8].value = 0;
      // board[12].value = 2;
      // Session.set(CURRENT_BOARD, board);
      // Tracker.flush();

    }else if(e.which == KEYPRESS_UP){

      console.log("KEYPRESS", 'up');
      var board = Session.get(CURRENT_BOARD);

      // if(board[12].value != 2) return;

      // // Test change
      // board[12].value = 0;
      // board[8].value = 2;
      // Session.set(CURRENT_BOARD, board);
      // Tracker.flush();

      // board[8].value = 0;
      // board[4].value = 2;
      // Session.set(CURRENT_BOARD, board);
      // Tracker.flush();

      // board[4].value = 0;
      // board[0].value = 2;
      // Session.set(CURRENT_BOARD, board);
      // Tracker.flush();

    }else if(e.which == KEYPRESS_LEFT){

      console.log("KEYPRESS", 'left');

    }else if(e.which == KEYPRESS_RIGHT){

      console.log("KEYPRESS", 'right');

    }


  }
});



