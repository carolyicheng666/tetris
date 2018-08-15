var Local = function() {
  var game
  // bind keyboard event
  var bindKeyEvent = function() {
    document.onkeydown = function(e) {
      if(e.keyCode == 37) { // left

      } else if(e.keyCode == 38) { // up

      } else if(e.keyCode == 39) { // right
        
      } else if(e.keyCode == 40) { // down
        game.down()
      } else if(e.keyCode == 32) { // space
        
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
  }
  // export
  this.start = start
}