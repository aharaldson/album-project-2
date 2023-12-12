const express = require('express');
const router = express.Router();
const ensureLoggedIn = require('../config/ensureLoggedIn');
const User = require('../models/user');

module.exports = {
  addToShelf,
  removeFromShelf,
};

async function addToShelf(req, res) {
    try {
      const { albumId } = req.body;
      const userId = req.user._id;
  
      const shelf = await Shelf.findOneAndUpdate(
        { user: userId },
        { $addToSet: { albums: albumId } },
        { new: true, upsert: true }
      );
  
      res.json(shelf);
    } catch (error) {
      console.error(error);
      res.status(500).send(error.message);
    }
  }
  

async function removeFromShelf(req, res) {
  try {
    const { albumId } = req.body;
    const userId = req.user._id;

    const shelf = await Shelf.findOneAndUpdate(
      { user: userId },
      { $pull: { albums: albumId } },
      { new: true }
    );

    res.json(shelf);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
}