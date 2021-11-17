import socketIOClient from 'socket.io-client';
export const socket = socketIOClient.connect('/');

const socketDebounce = () => {
  let lastkey = null;
  return function (event, key) {
    console.log('test');
    if (event === 'keydown' && key !== lastkey) {
      lastkey = key;
      socket.emit(event, key);
    } else if (event === 'keyup') {
      socket.emit(event, key);
    }
  };
};

const socketThrottle = () => {
  let canRun = true;
  return function (event, data) {
    if (canRun == true) {
      socket.emit(event, data);
      canRun = false;
      setTimeout(() => (canRun = true), 50);
    }
  };
};

export default socketThrottle();
