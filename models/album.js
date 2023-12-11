const { default: mongoose } = require("mongoose");

const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    content: {
      type: String,
      required: true
    },
    rating: {
      type: Number,
      min: 1,
      max: 10
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    userName: String,
    userAvatar: String
  }, {
    timestamps: true
  });

const albumSchema = new Schema ({
    artist: String,
    title: String,
    releaseYear: Number,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },
    tracks: [String],
    reviews: [reviewSchema]
}, {
    timestamps: true
});

module.exports = mongoose.model('Album', albumSchema);


