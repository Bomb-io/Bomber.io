import React from 'react';

function Player(props) {
    let style = {
        position: 'absolute',
        display: 'inline-block',
        left: props.position.right.offset - props.position.left.offset,
        top: props.position.down.offset - props.position.up.offset,
        fontSize: '100px',
        zIndex: '1'
    }
   
    if(props.position.right.pressed && props.position.up.pressed && (!props.position.left.pressed && !props.position.down.pressed)){
        //Going diagonally up right
    }else if(props.position.left.pressed && props.position.up.pressed && (!props.position.right.pressed && !props.position.down.pressed)){
        //Going diagonally up left
    }else if(props.position.right.pressed && props.position.down.pressed && (!props.position.left.pressed && !props.position.up.pressed)){
        //Going diagonally down right
    }else if(props.position.left.pressed && props.position.down.pressed && (!props.position.right.pressed && !props.position.up.pressed)){
        //Going diagonally down left
    }else if(props.position.up.pressed && (!props.position.down.pressed && !props.position.left.pressed && !props.position.right.pressed)){
        //Going up
    }else if(props.position.down.pressed && (!props.position.up.pressed && !props.position.left.pressed && !props.position.right.pressed)){
        //Going down
    }else if(props.position.left.pressed && (!props.position.down.pressed && !props.position.up.pressed && !props.position.right.pressed)){
        //Going left
    }else if(props.position.right.pressed && (!props.position.down.pressed && !props.position.left.pressed && !props.position.up.pressed)){
        //Going right
    }else{
        //Going crazzzzzyyyyy
    }

    // style.left = `${props.position.left}`
    // style.right = `${props.position.right}`
    // style.bottom = `${props.position.down}`
    // style.top = `${props.position.up}`
    return <span className="box" style={style}>{"X"}</span>
}



export default Player;
