import { createError } from '../utils/error.js';
import User from '../models/User.js';

export const update = async (req, res, next) => {
  if (req.params.id === req.user.id) {
    try {
      const updateUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updateUser);
    } catch (error) {
      next(error);
    }
  } else {
    return next(createError(403, 'You can update only your account!'));
  }
};

export const deleteUser = async (req, res, next) => {
  if (req.params.id === req.user.id) {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json('User has been deleted!');
    } catch (error) {
      next(error);
    }
  } else {
    return next(createError(403, 'You can delete only your account!'));
  }
};

export const getAUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const subscribe = async (req, res, next) => {
  const user = await User.findById(req.user.id);

  if (!user.subscribedUsers.includes(req.params.id)) {
    try {
      await User.findByIdAndUpdate(req.user.id, {
        $push: { subscribedUsers: req.params.id },
      });

      await User.findByIdAndUpdate(req.params.id, {
        $inc: { subscribers: 1 },
      });

      res.status(200).json('Subscribed successfully');
    } catch (error) {
      next(error);
    }
  } else {
    return next(
      createError(403, 'You are already subscribed to this channel!')
    );
  }
};

export const unsubscribe = async (req, res, next) => {
  const user = await User.findById(req.user.id);

  if (user.subscribedUsers.includes(req.params.id)) {
    try {
      await User.findByIdAndUpdate(req.user.id, {
        $pull: { subscribedUsers: req.params.id },
      });

      await User.findByIdAndUpdate(req.params.id, {
        $inc: { subscribers: -1 },
      });

      res.status(200).json('Unsubscribed successfully');
    } catch (error) {
      next(error);
    }
  } else {
    return next(
      createError(
        403,
        'You can unsubscribe only from channels you have subscribed!'
      )
    );
  }
};

export const like = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};

export const dislike = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};
