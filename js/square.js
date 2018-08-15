var Square = function() {
  // square data
  this.data = [
    [0, 2, 0, 0],
    [2, 2, 0, 0],
    [0, 2, 0, 0],
    [0, 0, 0, 0]
  ]
  // origin
  this.origin = {
    x: 0,
    y: 0
  }
}

Square.prototype.canDown = function(isValid) {
  var test = {}
  test.x = this.origin.x
  test.y = this.origin.y + 1
  return isValid(test, this.data)
}

Square.prototype.down = function() {
  this.origin.y += 1
}