import React from 'react';

const style = {
    display: 'inline-block',
    background: "green",
    height: "10%",
    width: "10%",
    padding: "0",
    margin: '0',
    zIndex: '0'
}

function Square() {
  return <span className="box" style={style}></span>
}

export default Square;
