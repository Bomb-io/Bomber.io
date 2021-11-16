import React, {useState, useEffect, useCallback} from 'react';
import Square from './Square.jsx';
import Player from './Player.jsx';
import Bomb from './Bomb.jsx';
//import BombManager from './Bomb.jsx';

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
}

function Board() {
    //let positions = {x: trackAxis("x"), y: trackAxis("y")}
    //keep track of positions of bombs

    let offsets = trackLocation();
    return <div style={boardStyle} className="board">
        {(() => {
            let squares = [];
            for(let i = 0; i < 100; i++){
                squares.push(<Square/>);
            }
            return squares;
        })()}
        <Player /*position={positions}*/ boardPosition={offsets} /*placeBomb={placeBomb}*//>
    </div>
}

function trackLocation() {
    //Function get's called too many times....
    const [offsets, setOffsets] = useState(0);

    function debounce(func, timeout = 500) {
      let timer;
      return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => { func.apply(this, args); }, timeout);
      };
    }
    let offsetsUpdator = useCallback(debounce(setOffsets));

    const updateOffsets = () => {
      let elem = document.querySelector('.board');
      let coordinates = elem.getBoundingClientRect();
      offsetsUpdator(coordinates);
    }

    useEffect(function() {
      window.addEventListener('resize', updateOffsets);
      updateOffsets();
      return () => {
        window.removeEventListener('resize', updateOffsets);
      }
    }, [])
    return offsets  
}

export default Board;
