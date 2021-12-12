const Room = require('./roomModel');

exports.create_room = async (req, res, next) => {
  try {
    const { roomId, name, type, owner, image } = req.body;

    const room = await Room.create({
      name,
      roomId,
      type,
      owner,
      image,
    });

    res.status(201).json({
      status: 'success',
      data: {
        room,
      },
    });
  } catch (err) {
    next(err);
  }
};

exports.publicRooms = async (req, res, next) => {
  try {
    const rooms = await Room.find({
      type: 'public',
    });

    res.status(200).json({
      status: 'success',
      results: rooms.length,
      data: {
        rooms,
      },
    });
  } catch (err) {
    next(err);
  }
};
exports.privateRooms = async (req, res, next) => {
  try {
    const { userId } = req.body;
    const rooms = await Room.find({
      owner: userId,
    });

    res.status(200).json({
      status: 'success',
      results: rooms.length,
      data: {
        rooms,
      },
    });
  } catch (err) {
    next(err);
  }
};
