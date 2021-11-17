require('dotenv').config();
const { createServer } = require('http');
const { Server } = require('socket.io');
const uuid = require('uuid');
const { initGame } = require('./game');

const app = require('./app');
const httpServer = createServer(app);
const io = new Server(httpServer);

//Global Variables for the Server
let Frame = 0; // count game frames
const FramesPerGameStateTransmission = 3; // How game state is broadcasted to players - per three frames
const MaxConnections = 10; // 10 players??
const Connections = {}; // Contains player state  and websocket info like IP.

const state = {};
const clientRooms = {}; //map client ids to rooms
const ids = [];
io.on('connection', (client) => {
  console.log('hello');
  ids.forEach((id) => client.emit('newPlayer', id));
  ids.push(client.id);
  client.broadcast.emit('newPlayer', client.id);

  // const state = createGameState(); //Create Gamestate as soon as player connects.
  //figure out key actions here
  client.on('keydown', handleKeydown); //generic key down event
  client.on('keyup', handleKeyup); //generic key down event
  client.on('position', (data) => {
    //console.log('emitting locations', "data")
    client.broadcast.emit(`${client.id}`, { clientId: client.id, data: data });
  });
  // client.on('newGame', handleNewGame);

  // client.on('joinGame', handleJoinGame);

  // Player movement broadcast
  // client.on('playerMove', handlePlayerMove);

  // Place bomb broadcast
  // client.on('placeBomb', handleBombPlace);

  // Player death broadcast
  // client.on('playerDeath', handlePlayerDeath);

  function handleJoinGame() {
    const room = io.sockets.adapter.rooms['room1']; // create room

    let allUser;
    if (room) {
      allUsers = room.sockets; //object of all the current users in room.  key is client id, object is client itself.
    }

    let numClients = 0;
    if (allUsers) {
      numClients = Object.keys(allUsers).length; //Number of clients
    }

    if (numClients == 0) {
      //no one in this room, game/room doesn't exist
      client.emit('unknownGame');
      return;
    } else if (numClients > 1) {
      //two player game for now...
      client.emit('tooManyPlayers');
      return;
    }

    clientRooms[client.id] = 'room1';
    client.join('room1');
    client.number = 2; //Second player to join a game;
    client.emit('init', 2); //Two player game
  }

  function handleNewGame() {
    //Create a new room.
    let roomName = 'room1'; //generate 5 character id
    clientRooms[client.id] = roomName;
    client.emit('gameCode', roomName);

    state[roomName] = initGame(); //create room as a part of state in global state object.
    client.join(roomName); //add client to room
    client.number = 1; //set current client to player 1, because they created the room.
    client.emit('init', 1); //send this back to frontend so its aware the number of the current player.
  }

  function handleKeydown(data) {
    //handle user actions here...
    console.log(data);
  }

  function handleKeyup(data) {
    //handle user actions here...
    console.log(data);
  }
});

function startGameInterval(roomName) {}

function emitGameState(gameState) {
  // Send this event to everyone in the room.
  io.sockets.in(room).emit('gameState', JSON.stringify(gameState));
}

function emitGameOver(room, winner) {
  io.sockets.in(room).emit('gameOver', JSON.stringify({ winner }));
}

const PORT = process.env.PORT || 3000;

httpServer.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
});
