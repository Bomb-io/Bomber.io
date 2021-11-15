const bcrypt = require('bcrypt');
const db = require('../database/db');

const playerController = {};

playerController.getPlayer = async (req, res, next) => {
  const queryString = `SELECT * FROM players where players.username = $1;`;

  try {
    const response = await db.query(queryString, [req.params.username]);
    res.locals.player = response.rows;
    return next();
  } catch (err) {
    return next({
      log: `ERROR in playerController.getPlayer: ${err}`,
      message: { err: 'An error occurred' },
    });
  }
};

playerController.createPlayer = async (req, res, next) => {
  const queryString = `INSERT INTO 
  players 
  (username, password) 
VALUES 
  ($1, $2);`;

  try {
    const { username, password } = req.body;
    const hashedPW = await bcrypt.hash(password, 12);
    await db.query(queryString, [username, hashedPW]);
    res.locals.player = { username };
    return next();
  } catch (err) {
    return next({
      log: `ERROR in playerController.createPlayer: ${err}`,
      message: { err: 'An error occurred' },
    });
  }
};

playerController.incrementGames = async (req, res, next) => {
  const getString = `
    SELECT
      games
    FROM
      players
    WHERE
      players.username = $1;
    `;

  const setString = `
    UPDATE
      players 
    SET
      games = $1
    WHERE
      players.username = $2;
`;

  try {
    const getResponse = await db.query(getString, [req.params.username]);
    const games = +getResponse.rows[0].games;
    await db.query(setString, [games + 1, req.params.username]);
    res.locals.player = { username: req.params.username, games: games + 1 };
    return next();
  } catch (err) {
    return next({
      log: `ERROR in playerController.createPlayer: ${err}`,
      message: { err: 'An error occurred' },
    });
  }
};

playerController.incrementWins = async (req, res, next) => {
  const getString = `
    SELECT
      wins
    FROM
      players
    WHERE
      players.username = $1;
    `;

  const setString = `
    UPDATE
      players 
    SET
      wins = $1
    WHERE
      players.username = $2;
`;

  try {
    const getResponse = await db.query(getString, [req.params.username]);
    const wins = +getResponse.rows[0].wins;
    await db.query(setString, [wins + 1, req.params.username]);
    res.locals.player = { username: req.params.username, wins: wins + 1 };
    return next();
  } catch (err) {
    return next({
      log: `ERROR in playerController.createPlayer: ${err}`,
      message: { err: 'An error occurred' },
    });
  }
};

playerController.getLeaders = async (req, res, next) => {
  const queryString = `SELECT * FROM players ORDER BY wins DESC LIMIT 10`;

  try {
    const response = await db.query(queryString);
    res.locals.leaders = response.rows;
    return next();
  } catch (err) {
    return next({
      log: `ERROR in playerController.getPlayer: ${err}`,
      message: { err: 'An error occurred' },
    });
  }
};

module.exports = playerController;
