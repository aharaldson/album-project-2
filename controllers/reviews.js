const album = require('../models/album');
const Album = require('../models/album');

module.exports = {
  create,
  delete: deleteReview
};

async function create(req, res) {
  const album = await Album.findById(req.params.id);
  const { content, rating } = req.body;

  // Check if content and rating are provided
  if (content && rating) {
    req.body.user = req.user._id;
    req.body.userName = req.user.name;
    req.body.userAvatar = req.user.avatar;

    album.reviews.push(req.body);
  }

  try {
    await album.save();
  } catch (err) {
    console.error(err);
    // Handle the case where the save operation fails
    return res.status(500).send('Error saving review.');
  }

  res.redirect(`/albums/${album._id}`);
}

async function deleteReview(req, res) {
  const album = await Album.findOne({ 'reviews._id': req.params.id, 'reviews.user': req.user._id});
  if (!album) return res.redirect('/albums');
  album.reviews.remove(req.params.id);
  await album.save();
  res.redirect(`/albums/${album._id}`);
}

