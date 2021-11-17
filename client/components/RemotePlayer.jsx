import React, { useState, useEffect, useCallback } from "react";
import {socket} from './useSocket.js'


function RemotePlayer(props) {
  //Set coords here
  const [coords, setCoords] = useState({x: {offset: null}, y: {offset: null}});
  let leftPosition = coords.x.offset;
  let topPosition = coords.y.offset;
  let direction;
    socket.on(`${props.id}`, function({data}){
        setCoords(data.coords)
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
