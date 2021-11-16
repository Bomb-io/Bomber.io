import React, {useState, useEffect} from 'react';
import Square from './Square.jsx';
import Player from './Player.jsx';


let boardStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    width: '100%',  
    height: '98vh',
    margin: '0',
    zIndex: '0',
}

function Board() {
    let positions = {up: useKeyPress("w"), down: useKeyPress("s"), right: useKeyPress("d"), left: useKeyPress("a")}
    return <div style={boardStyle}>
        {(() => {
            let squares = [];
            for(let i = 0; i < 100; i++){
                squares.push(<Square/>);
            }
            return squares;
        })()}
        <Player position={positions}/>
    </div>
}

function useKeyPress(targetKey) {
    // State for keeping track of whether key is pressed
    const [offset, setOffset] = useState(0);
    const [pressing, setPressing] = useState(0);
    // If pressed key is our target key then set to true
    function downHandler({ key }) {
      if (key === targetKey && !this[targetKey]) {
          this[targetKey] = setInterval(() => {
              setOffset(offset => offset + 5);
              setPressing(true)
          }, 10);
          //console.log(newInterval);
          //changeInterval(newInterval);
          //changeInterval(interval => newInterval);
          //console.log(interval);
        //setOffset(offset => offset + 5)
      }
    }
    // If released key is our target key then set to false
    function upHandler({ key }) {
      if (key === targetKey && this[targetKey]) {
        //changeInterval(false);
        clearInterval(this[targetKey]);
        setPressing(false);
        this[targetKey] = false;
      }
    };
    // Add event listeners
    useEffect(function() {
      let keys = {
          
      }
      window.addEventListener("keydown", downHandler.bind(keys));
      window.addEventListener("keyup", upHandler.bind(keys));
      
      // Remove event listeners on cleanup
      return () => {
        window.removeEventListener("keydown", downHandler);
        window.removeEventListener("keyup", upHandler);
      };
    }, []); // Empty array ensures that effect is only run on mount and unmount
    return {offset: offset, pressing: pressing};
  }

export default Board;
