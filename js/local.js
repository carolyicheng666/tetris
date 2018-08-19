var Local = function() {
  var game
  // time interval
  var interval = 200
  // timer
  var timer = null
  // time count
  var timeCount = 0
  // time
  var time = 0
  // bind keyboard event
  var bindKeyEvent = function() {
    document.onkeydown = function(e) {
      if(e.keyCode == 37) { // left
        game.left()
      } else if(e.keyCode == 38) { // up
        game.rotate()
      } else if(e.keyCode == 39) { // right
        game.right()
      } else if(e.keyCode == 40) { // down
        game.down()
      } else if(e.keyCode == 32) { // space
        game.fall()
      }
    }
  }
  // random type
  var generateType = function() {
    return Math.floor(Math.random() * 7)
  }
  // random rotate dir
  var generateDir = function() {
    return Math.floor(Math.random() * 4)
  }
  // random bottom lines
  var generateBottomLine = function(lineNum) {
    var lines = []
    for (var i=0; i<lineNum; i++) {
      var line = []
      for (var j=0; j<10; j++) {
        line.push(Math.floor(Math.random() * 2))
      }
      lines.push(line)
    }
    return lines
  }
  // time function
  var timeFunc = function() {
    timeCount += 1
    if (timeCount == 5) {
      timeCount = 0
      time += 1
      game.setTime(time)
      if (time % 10 == 0) {
        game.addTailLines(generateBottomLine(1))
      }
    }
  }
  // move
  var move = function() {
    timeFunc()
    if (!game.down()) {
      game.fixed()
      var line = game.clearLine()
      if (line) {
        game.addScore(line)
      }
      if (game.checkGameOver()) {
        game.gameover(false)
        stop()
      } else {
        game.performNext(generateType(), generateDir())
      }
    }
  }
  // start
  var start = function() {
    var doms = {
      gameDiv: document.getElementById('game'),
      nextDiv: document.getElementById('next'),
      timeDiv: document.getElementById('time'),
      scoreDiv: document.getElementById('score'),
      resultDiv: document.getElementById('gameover')
    }
    game = new Game()
    game.init(doms, generateType(), generateDir())
    bindKeyEvent()
    game.performNext(generateType(), generateDir())
    timer = setInterval(move, interval)
  }
  // stop
  var stop = function() {
    if (timer) {
      clearInterval(timer)
      timer = null
    }
    document.onkeydown = null
  }
  // export
  this.start = start
}