import React, { useState, useEffect, useCallback } from 'react';
import Square from './Square.jsx';
import Player from './Player.jsx';

let boardStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  position: 'absolute',
  top: '50%',
  left: '50%',
  marginTop: '-400px',
  marginLeft: '-700px',
  width: '1300px',
  height: '800px',
  zIndex: '0',
};

function Board() {
  let positions = { x: trackAxis('x'), y: trackAxis('y') };
  let offsets = trackLocation();
  return (
    <div style={boardStyle} className="board">
      {(() => {
        let squares = [];
        for (let i = 0; i < 100; i++) {
          squares.push(<Square />);
        }
        return squares;
      })()}
      <Player position={positions} boardPosition={offsets} />
    </div>
  );
}

function trackLocation() {
  //Function get's called too many times....
  const [offsets, setOffsets] = useState(0);

  function debounce(func, timeout = 500) {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func.apply(this, args);
      }, timeout);
    };
  }
  let offsetsUpdator = useCallback(debounce(setOffsets));

  const updateOffsets = () => {
    let elem = document.querySelector('.board');
    let coordinates = elem.getBoundingClientRect();
    offsetsUpdator(coordinates);
  };

  useEffect(function () {
    window.addEventListener('resize', updateOffsets);
    updateOffsets();
    return () => {
      window.removeEventListener('resize', updateOffsets);
    };
  }, []);
  return offsets;
}

function trackAxis(targetAxis) {
  // State for keeping track of whether key is pressed
  const [offset, setOffset] = useState(0);
  const [pressing, setPressing] = useState(0);
  // If pressed key is our target key then set to true
  function downHandler({ key }) {
    socket.emit('keydown', key);
    if (!this[targetAxis]) {
      if (targetAxis == 'x') {
        if (key == 'a') {
          this[targetAxis] = setInterval(() => {
            setOffset((offset) => offset - 5);
            setPressing({ right: false, left: true });
          }, 10);
        } else if (key == 'd') {
          this[targetAxis] = setInterval(() => {
            setOffset((offset) => offset + 5);
            setPressing({ right: true, left: false });
          }, 10);
        }
      } else if (targetAxis == 'y') {
        if (key === 'w') {
          this[targetAxis] = setInterval(() => {
            setOffset((offset) => offset - 5);
            setPressing({ up: true, down: false });
          }, 10);
        } else if (key === 's') {
          this[targetAxis] = setInterval(() => {
            setOffset((offset) => offset + 5);
            setPressing({ up: false, down: true });
          }, 10);
        }
      }
    }
  }
  // If released key is our target key then set to false
  function upHandler({ key }) {
    if (this[targetAxis]) {
      socket.emit('keyup', key);
      //changeInterval(false);
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

export default Board;
