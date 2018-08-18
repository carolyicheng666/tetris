var Local = function() {
  var game
  // time interval
  var interval = 200
  // timer
  var timer = null
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
  // move
  var move = function() {
    if (!game.down()) {
      game.fixed()
      game.clearLine()
      if (game.checkGameOver()) {
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
      nextDiv: document.getElementById('next')
    }
    game = new Game()
    game.init(doms)
    bindKeyEvent()
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