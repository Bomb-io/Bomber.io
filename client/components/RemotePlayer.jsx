import React, { useState, useEffect, useCallback } from "react";
import {socket} from './useSocket.js'


function RemotePlayer(props) {
  //Set coords here
  let leftPosition;
  let topPosition;
  let direction;
  console.log(props.id)
  console.log('HHHHH')
    socket.on(`${props.id}`, function(data){
        console.log(data);
    })

  let style = {
    position: "absolute",
    display: "inline-block",
    left: leftPosition,
    top: topPosition,
    fontSize: "100px",
    zIndex: "1",
  };

  return (
    <span className="player" style={style}>
      {"X"}
    </span>
  );
}

export default RemotePlayer;
