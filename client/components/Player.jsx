import React, { useState, useEffect, useCallback } from 'react';

import socket from './useSocket';
function Player(props) {
  const [bombPlaced, placeBomb] = useState(false);
  useEffect(function () {
    function handleBomb({ key }) {
      if (key == ' ') {
        props.placeBomb();
      }
    }
    window.addEventListener('keydown', handleBomb);
    return () => {
      window.removeEventListener('keydown', handleBomb);
    };
  }, []);
  //Get coordinates
  let coords = { x: trackAxis('x'), y: trackAxis('y') };
  let leftPosition = coords.x.offset;
  let topPosition = coords.y.offset;
  let style = {
    position: 'absolute',
    display: 'inline-block',
    left: leftPosition,
    top: topPosition,
    fontSize: '100px',
    zIndex: '1',
  };

  let direction = broadcastPos(coords);
  // console.log('x offset: ' + (props.boardPosition.left + leftPosition))
  // console.log('y offset: ' + (props.boardPosition.top + topPosition))
  //console.log(props.boardPosition);

  // style.left = `${coords.left}`
  // style.right = `${coords.right}`
  // style.bottom = `${coords.down}`
  // style.top = `${coords.up}`
  /*if(bombPlaced){
        props.placeBomb();
        placeBomb(false);
    }*/

  return (
    <span className="player" style={style}>
      {'X'}
    </span>
  );
}

function trackAxis(targetAxis) {
  // State for keeping track of whether key is pressed
  const [offset, setOffset] = useState(0);
  const [pressing, setPressing] = useState(0);
  // If pressed key is our target key then set to true
  function downHandler({ key }) {
    //if (['w', 'a', 's', 'd', ' '].includes(key)) socket('keydown', key);
    if (!this[targetAxis]) {
      if (targetAxis == 'x') {
        if (key == 'a') {
          this[targetAxis] = setInterval(() => {
            setOffset((offset) => offset - 3);
            setPressing({ right: false, left: true });
          }, 10);
        } else if (key == 'd') {
          this[targetAxis] = setInterval(() => {
            setOffset((offset) => offset + 3);
            setPressing({ right: true, left: false });
          }, 10);
        }
      } else if (targetAxis == 'y') {
        if (key === 'w') {
          this[targetAxis] = setInterval(() => {
            setOffset((offset) => offset - 3);
            setPressing({ up: true, down: false });
          }, 10);
        } else if (key === 's') {
          this[targetAxis] = setInterval(() => {
            setOffset((offset) => offset + 3);
            setPressing({ up: false, down: true });
          }, 10);
        }
      }
    }
  }
  // If released key is our target key then set to false
  function upHandler({ key }) {
    if (this[targetAxis]) {
      //changeInterval(false);
      //if (['w', 'a', 's', 'd', ' '].includes(key)) socket('keyup', key);
      if (targetAxis == 'x' && (key == 'a' || key == 'd')) {
        clearInterval(this[targetAxis]);
        setPressing(false);
        this[targetAxis] = false;
      } else if (targetAxis == 'y' && (key == 'w' || key == 's')) {
        clearInterval(this[targetAxis]);
        setPressing(false);
        this[targetAxis] = false;
      }
    }
  }
  // Add event listeners
  useEffect(function () {
    let keys = {};
    window.addEventListener('keydown', downHandler.bind(keys));
    window.addEventListener('keyup', upHandler.bind(keys));

    // Remove event listeners on cleanup
    return () => {
      window.removeEventListener('keydown', downHandler.bind(keys));
      window.removeEventListener('keyup', upHandler.bind(keys));
    };
  }, []); // Empty array ensures that effect is only run on mount and unmount
  return { offset: offset, pressing: pressing };
}

function broadcastPos(coords) {
  let direction;
  if (
    coords.x.pressing.right &&
    coords.y.pressing.up &&
    !coords.x.pressing.left &&
    !coords.y.pressing.down
  ) {
    direction = 'upright';
    //Going diagonally up right
  } else if (
    coords.x.pressing.left &&
    coords.y.pressing.up &&
    !coords.x.pressing.right &&
    !coords.y.pressing.down
  ) {
    direction = 'upleft';
    //Going diagonally up left
  } else if (
    coords.x.pressing.right &&
    coords.y.pressing.down &&
    !coords.x.pressing.left &&
    !coords.y.pressing.up
  ) {
    direction = 'downright';
    //Going diagonally down right
  } else if (
    coords.x.pressing.left &&
    coords.y.pressing.down &&
    !coords.x.pressing.right &&
    !coords.y.pressing.up
  ) {
    direction = 'downleft';
    //Going diagonally down left
  } else if (
    coords.y.pressing.up &&
    !coords.y.pressing.down &&
    !coords.x.pressing.left &&
    !coords.x.pressing.right
  ) {
    direction = 'up';
    //Going up
  } else if (
    coords.y.pressing.down &&
    !coords.y.pressing.up &&
    !coords.x.pressing.left &&
    !coords.x.pressing.right
  ) {
    direction = 'down';
    //Going down
  } else if (
    coords.x.pressing.left &&
    !coords.y.pressing.down &&
    !coords.y.pressing.up &&
    !coords.x.pressing.right
  ) {
    direction = 'left';
    //Going left
  } else if (
    coords.x.pressing.right &&
    !coords.y.pressing.down &&
    !coords.x.pressing.left &&
    !coords.y.pressing.up
  ) {
    direction = 'right';
    //Goign right
  } else {
    direction = 'crazy';
    //Going crazzzzzyyyyy
  }
  socket('position', { coords: coords, direction: direction });
  return direction;
}

export default Player;
