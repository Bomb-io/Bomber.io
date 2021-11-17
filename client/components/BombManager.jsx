import React, {useState, useEffect,} from 'react';
import Bomb from './Bomb.jsx'
import {socket} from './useSocket.js'

function BombManager(){
    const [bombs, setBombs] = useState([]);

    socket.on('bombs', function(bombsArr){
        setBombs(bombsArr.map(function(elem) {
            //Return a <Bomb/> component with the props taken from elem
            return <Bomb leftPosition={bomb.x} topPosition={bomb.y} exploding={bomb.exploding}/>
        }));
    });

    return <span>
        {bombs}
    </span>
};

export default BombManager;