const express = require('express');
const router = express.Router();
// You'll be creating this controller module next
const albumsCtrl = require('../controllers/albums');
const ensureLoggedIn = require('../config/ensureLoggedIn');
	
// GET /movies
router.get('/', albumsCtrl.index);
// GET /movies/new
router.get('/new', ensureLoggedIn, albumsCtrl.new);
// GET /movies/:id (show functionality) MUST be below new route
router.get('/:id', albumsCtrl.show);
// POST /movies
router.post('/', ensureLoggedIn, albumsCtrl.create);
	
module.exports = router;