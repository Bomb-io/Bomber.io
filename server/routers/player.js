const express = require('express');

const playerController = require('../controllers/playerController');

const router = express.Router();

router.get('/games/:username', playerController.incrementGames, (req, res) =>
  res.status(200).json(res.locals.player)
);

router.get('/wins/:username', playerController.incrementWins, (req, res) =>
  res.status(200).json(res.locals.player)
);

router.get('/leaders', playerController.getLeaders, (req, res) =>
  res.status(200).json(res.locals.leaders)
);

router.get('/:username', playerController.getPlayer, (req, res) =>
  res.status(200).json(res.locals.player)
);

router.post('/', playerController.createPlayer, (req, res) =>
  res.status(200).json(res.locals.player)
);

module.exports = router;
