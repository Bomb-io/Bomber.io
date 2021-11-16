import socketIOClient from 'socket.io-client';

const socketDebounce = () => {
  const socket = socketIOClient.connect('/');
  let downkeys = [];
  return function (event, key) {
    if (event === 'keydown' && key !== lastkey) {
      lastkey = key;
      socket.emit(event, key);
    } else if (event === 'keyup') {
      socket.emit(event, key);
      if ()
    }
  };
};

export default socketDebounce();
