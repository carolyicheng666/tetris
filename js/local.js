var Local = function() {
  var game
  // start
  var start = function() {
    var doms = {
      gameDiv: document.getElementById('game'),
      nextDiv: document.getElementById('next')
    }
    game = new Game()
    game.init(doms)
  }
  // export
  this.start = start
}