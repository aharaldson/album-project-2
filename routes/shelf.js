const express = require('express');
const router = express.Router();
const shelfCtrl = require('../controllers/shelf');
const ensureLoggedIn = require('../config/ensureLoggedIn');
const User = require('../models/user');

router.post('/add', ensureLoggedIn, shelfCtrl.addToShelf);

router.post('/remove', ensureLoggedIn, shelfCtrl.removeFromShelf);

router.get('/', ensureLoggedIn, async (req, res) => {
    try {
      const userWithShelf = await User.findById(req.user._id).populate('shelf');
  
      res.render('albums/shelf', { title: 'Your Shelf', user: userWithShelf });
    } catch (error) {
      console.error(error);
      res.status(500).send('Error fetching shelf.');
    }
  });

  router.post('/:userId/add', ensureLoggedIn, async (req, res) => {
    try {
      const { userId } = req.params;
      const { albumId } = req.body;
  
      console.log('User ID:', userId);
      console.log('Album ID:', albumId);
  
      req.user.shelf.push(albumId);
  
      console.log('User Shelf After Push:', req.user.shelf);
  
      await req.user.save();
  
      const userWithShelf = await User.findById(userId).populate('shelf');
  
      console.log('User Shelf After Save:', userWithShelf.shelf);
  
      res.render('albums/shelf', { title: 'Your Shelf', user: userWithShelf });
    } catch (error) {
      console.error(error);
      res.status(500).send(error.message);
    }
  });

module.exports = router;