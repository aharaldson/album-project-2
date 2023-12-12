const Album = require('../models/album');

module.exports = {
    index,
    show,
    new: newAlbum,
    create,
};

async function index(req, res) {
    const albums = await Album.find({});
    res.render('albums/index', { title: 'All Albums', albums });
  }

async function show(req, res) {
    const album = await Album.findById(req.params.id);
    res.render('albums/show', { title: 'Album Detail', album });
}

function newAlbum(req, res) {
    res.render('albums/new', { title: 'Add Album', errorMsg: '' });
}

async function create(req, res) {
    for (let key in req.body) {
        if (req.body[key] === '') delete req.body[key];
      }
      try {
        req.body.user = req.user._id;
        const album = await Album.create(req.body);
        res.redirect(`/albums/${album._id}`);
      } catch (err) {
        console.log(err);
        res.render('albums/new', {  title: 'Add Album', errorMsg: err.message });
      }
}