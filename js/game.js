var Game = function() {
  // DOM
  var nextDiv
  var gameDiv
  // game
  gameData = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  ]
  // current square
  var cur
  // next square
  var next
  // divs
  var nextDivs = []
  var gameDivs = []
  //init div
  var initDiv = function(container, data, divs) {
    for(var i=0; i<data.length; i++) {
      var div = []
      for(var j=0; j<data[0].length; j++) {
        var newNode = document.createElement('div')
        newNode.className = 'none'
        newNode.style.top = (i*20) + 'px'
        newNode.style.left = (j*20) + 'px'
        container.appendChild(newNode)
        div.push(newNode)
      }
      divs.push(div)
    }
  }
  // refresh div
  var refreshDiv = function(data, divs) {
    for(var i=0; i<data.length; i++) {
      for(var j=0; j<data[0].length; j++) {
        if(data[i][j] == 0) {
          divs[i][j].className = 'none'
        } else if (data[i][j] == 1) {
          divs[i][j].className = 'done'
        } else if (data[i][j] == 2) {
          divs[i][j].className = 'current'
        }
      }
    }
  }
  // check point
  var check = function(pos, x, y) {
    if(pos.y + y < 0) {
      return false
    } else if(pos.y + y >= gameData.length) {
      return false
    } else if(pos.x + x < 0) {
      return false
    } else if(pos.x + x >= gameData[0].length) {
      return false
    } else if(gameData[pos.y + y][pos.x + x] == 1) {
      return false
    } else {
      return true
    }
  }
  // check data
  var isValid = function(pos, data) {
    for(var i=0; i<data.length; i++) {
      for(var j=0; j<data[0].length; j++) {
        if(data[i][j] != 0) {
          if(!check(pos, j, i)) {
            return false
          }
        }
      }
    }
    return true
  }
  // set data
  var setData = function() {
    for(var i=0; i<cur.data.length; i++) {
      for(var j=0; j<cur.data[0].length; j++) {
        if (check(cur.origin, j, i)) {
          gameData[cur.origin.y + i][cur.origin.x + j] = cur.data[i][j]
        }
      }
    }
  }
  // clear data
  var clearData = function() {
    for(var i=0; i<cur.data.length; i++) {
      for(var j=0; j<cur.data[0].length; j++) {
        if (check(cur.origin, j, i)) {
          gameData[cur.origin.y + i][cur.origin.x + j] = 0
        }
      }
    }
  }
  // move down
  var down = function() {
    if (cur.canDown(isValid)) {
      clearData()
      cur.down()
      setData()
      refreshDiv(gameData, gameDivs)
      return true
    } else {
      return false
    }
  }
  // move left
  var left = function() {
    if (cur.canLeft(isValid)) {
      clearData()
      cur.left()
      setData()
      refreshDiv(gameData, gameDivs)  
    }
  }
  // move right
  var right = function() {
    if (cur.canRight(isValid)) {
      clearData()
      cur.right()
      setData()
      refreshDiv(gameData, gameDivs)  
    }
  }
  // rotate
  var rotate = function() {
    if (cur.canRotate(isValid)) {
      clearData()
      cur.rotate()
      setData()
      refreshDiv(gameData, gameDivs)  
    }
  }
  // init
  var init = function(doms) {
    gameDiv = doms.gameDiv
    nextDiv = doms.nextDiv
    cur = SquareFactory.prototype.make(2, 2)
    next = SquareFactory.prototype.make(3, 3)
    initDiv(gameDiv, gameData, gameDivs)
    initDiv(nextDiv, next.data, nextDivs)

    setData()

    refreshDiv(gameData, gameDivs)
    refreshDiv(next.data, nextDivs)
  }
  // export
  this.init = init
  this.down = down
  this.left = left
  this.right = right
  this.rotate = rotate
  this.fall = function() {
    while(down());
  }
}