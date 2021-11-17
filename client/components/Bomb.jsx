import React, {useState, useEffect,} from 'react';

function Bomb() {
  let style = {
    position: 'absolute',
    display: 'inline-block',
    left: props.leftPosition,
    top: props.topPosition,
    fontSize: '100px',
    zIndex: '1',
  };

  return <span class="bomb">{(() => {
    if(props.exploding == true){
      return "------O------"
    }else{
      return "O"
    }
  })()}</span>;
}

export default Bomb;