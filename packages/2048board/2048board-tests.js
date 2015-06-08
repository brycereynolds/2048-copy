// test.equal(actual, expected, message, not)
// test.notEqual(actual, expected, message)
// test.instanceOf(obj, klass)
// test.matches(actual, regexp, message)
// test.isTrue(actual, msg)
// test.isFalse(actual, msg)
// test.isNull(actual, msg)
// test.isNotNull(actual, msg)
// test.isUndefined(actual, msg)
// test.isNaN(actual, msg)
// test.length(obj, expected_length, msg)

// var testData = [
//   [0,0,2,0],
//   [4,0,0,0],
//   [0,0,0,0],
//   [0,0,0,8]
// ];


Tinytest.add('testSingleColumnDownMoves', function (test) {
  var harness = [
    {data: [[0],[4],[0],[0]], expected: "0,0,0,4", score: 0},
    {data: [[0],[4],[2],[0]], expected: "0,0,4,2", score: 0},
    {data: [[0],[2],[2],[0]], expected: "0,0,0,4", score: 4},
    {data: [[2],[2],[2],[0]], expected: "0,0,2,4", score: 4},
    {data: [[4],[2],[2],[0]], expected: "0,0,4,4", score: 4},
    {data: [[2],[2],[4],[0]], expected: "0,0,4,4", score: 4}
  ];

  for (var i = 0; i < harness.length; i++) {
    var d = harness[i];
    var board = new GameBoardService({
      data: d.data,
      width: 1,
      height: 4
    });

    test.equal(board.getData().join(","), d.data.join(","));

    board.shift('down');

    test.equal(board.getData().join(","), d.expected);
    test.equal(board.getScore(), d.score);

  };

});

Tinytest.add('testSingleColumnUpMoves', function (test) {
  var harness = [
    {data: [[0],[4],[0],[0]], expected: "4,0,0,0", score: 0},
    {data: [[0],[4],[2],[0]], expected: "4,2,0,0", score: 0},
    {data: [[0],[2],[2],[0]], expected: "4,0,0,0", score: 4},
    {data: [[2],[2],[2],[0]], expected: "4,2,0,0", score: 4},
    {data: [[4],[2],[2],[0]], expected: "4,4,0,0", score: 4},
    {data: [[2],[2],[4],[0]], expected: "4,4,0,0", score: 4}
  ];

  for (var i = 0; i < harness.length; i++) {
    var d = harness[i];
    var board = new GameBoardService({
      data: d.data,
      width: 1,
      height: 4
    });

    test.equal(board.getData().join(","), d.data.join(","));

    board.shift('up');

    test.equal(board.getData().join(","), d.expected);
    test.equal(board.getScore(), d.score);

  };

});
