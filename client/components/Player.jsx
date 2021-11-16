import React from 'react';

function Player(props) {
    let leftPosition = props.position.x.offset;
    let topPosition = props.position.y.offset;
    let style = {
        position: 'absolute',
        display: 'inline-block',
        left: leftPosition,
        top: topPosition,
        fontSize: '100px',
        zIndex: '1'
    }
   
    if(props.position.x.pressing.right && props.position.y.pressing.up && (!props.position.x.pressing.left && !props.position.y.pressing.down)){
        //Going diagonally up right
        console.log("upright")
    }else if(props.position.x.pressing.left && props.position.y.pressing.up && (!props.position.x.pressing.right && !props.position.y.pressing.down)){
        //Going diagonally up left
        console.log("upleft")
    }else if(props.position.x.pressing.right && props.position.y.pressing.down && (!props.position.x.pressing.left && !props.position.y.pressing.up)){
        //Going diagonally down right
        console.log("downright")
    }else if(props.position.x.pressing.left && props.position.y.pressing.down && (!props.position.x.pressing.right && !props.position.y.pressing.up)){
        //Going diagonally down left
        console.log("downleft")
    }else if(props.position.y.pressing.up && (!props.position.y.pressing.down && !props.position.x.pressing.left && !props.position.x.pressing.right)){
        //Going up
        console.log("up")
    }else if(props.position.y.pressing.down && (!props.position.y.pressing.up && !props.position.x.pressing.left && !props.position.x.pressing.right)){
        //Going down
        console.log("down")
    }else if(props.position.x.pressing.left && (!props.position.y.pressing.down && !props.position.y.pressing.up && !props.position.x.pressing.right)){
        //Going left
        console.log("left")
    }else if(props.position.x.pressing.right && (!props.position.y.pressing.down && !props.position.x.pressing.left && !props.position.y.pressing.up)){
        //Goign right
        console.log("right")
    }else{
        //Going crazzzzzyyyyy
    }
    // console.log('x offset: ' + (props.boardPosition.left + leftPosition))
    // console.log('y offset: ' + (props.boardPosition.top + topPosition))
    //console.log(props.boardPosition);

    // style.left = `${props.position.left}`
    // style.right = `${props.position.right}`
    // style.bottom = `${props.position.down}`
    // style.top = `${props.position.up}`
    return <span className="player" style={style}>{"X"}</span>
}



export default Player;
