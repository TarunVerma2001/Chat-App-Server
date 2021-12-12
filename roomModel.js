const mongoose = require('mongoose');

const roomShema = mongoose.Schema(
  {
    roomId: {
      type: String,
      required: [true, 'A room must have an id!'],
    },
    type: {
      type: String,
      enum: ['public', 'priate'],
    },
    name: {
      type: String,
      required: [true, 'A room must have a name'],
    },
    owner: {
      type: String,
      required: [true, 'A room must have an owner'],
    },
    image: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);


const Room = mongoose.model('Room', roomModel);

module.exports = Room;