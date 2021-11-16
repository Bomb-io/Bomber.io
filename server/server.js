require('dotenv').config();
const path = require('path');
const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');
const uuid = require('uuid');
const { initGame } = require('./game');

const passport = require('passport');
const cookieSession = require('cookie-session');
require('./config/passport');

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

//Global Variables for the Server
let Frame = 0; // count game frames
const FramesPerGameStateTransmission = 3; // How game state is broadcasted to players - per three frames
const MaxConnections = 10; // 10 players??
const Connections = {}; // Contains player state  and websocket info like IP.

// import routers
const playerRouter = require('./routers/player');
const authRouter = require('./routers/auth');

// utility middleware
app.use(express.json());
app.use(express.static(path.resolve(__dirname, '../dist')));

// enable sessions using passport.js middleware
app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [process.env.COOKIE_KEY],
    httpOnly: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// use routers
app.use('/api/player', playerRouter);
app.use('/api/auth', authRouter);

// serve index
app.get('/', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, '../dist/index.html'));
});

const clientRooms = {}; //map client ids to rooms

io.on('connection', (client) => {
  // const state = createGameState(); //Create Gamestate as soon as player connects.
  //figure out key actions here

  // client.on('keydown', handleKeydown);
  // client.on('newGame', handleNewGame);
  // client.on('joinGame', handleJoinGame);

  function handleJoinGame(gameCode) {
    const room = io.sockets.adapter.rooms[gameCode];

    let allUser;
    if (room) {
      allUsers = room.sockets; //object of all the current users in room.  key is client id, object is client itself.
    }

    let numCliencts = 0;
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

    clientRooms[client.id] = gameCode;
    client.join(gameCode);
    client.number = 2; //Second player to join a game;
    client.emit('init', 2); //Two player game
  }

  function handleNewGame() {
    //Create a new room.
    let roomName = makeId(5); //generate 5 character id
    clientRooms[client.id] = roomName;
    client.emit('gameCode', roomName);

    state[roomName] = initGame(); //create room as a part of state in global state object.
    client.join(roomName); //add client to room
    client.number = 1; //set current client to player 1, because they created the room.
    client.emit('init', 1); //send this back to frontend so its aware the number of the current player.
  }

  function handleKeydown() {
    //handle user actions here...
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

// 404 handler
app.use((req, res) => res.status(404).send('Page not found!'));

// global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = { ...defaultErr, ...err };
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

const PORT = process.env.PORT || 3000;

httpServer.listen(3000, () => {
  console.log(`server listening on port ${PORT}`);
});

module.exports = httpServer;
