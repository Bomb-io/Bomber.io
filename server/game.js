const { GRID_SIZE } = require('./constants');

module.exports = {
  initGame,
  gameLoop,
  //getUpdatedVelocity,
}

function initGame() {
  const state = createGameState()
  //randomFood(state);
  return state;
}

//initial gamestate---probably start the characters off in different corners
function createGameState() {
  return {
    players: [{
        pos: {
          x: 0,
          y: 0,
        },
        }, {
        pos: {
          x: 10,
          y: 10,
        },
      }],
  };
}

function gameLoop(state) { //figure out gameloop logic
  
}

function randomPowerUp(state) { //Stretch feature...

}

function getUpdatedPosition(keyCode) { //Get new positions?
  switch (keyCode) {
    case 37: { // left
      return { x: -1, y: 0 };
    }
    case 38: { // down
      return { x: 0, y: -1 };
    }
    case 39: { // right
      return { x: 1, y: 0 };
    }
    case 40: { // up
      return { x: 0, y: 1 };
    }
  }
}