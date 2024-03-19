import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import { createError } from '../utils/error.js';

export const signup = async (req, res, next) => {
  try {
    //hashing password
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const newUser = new User({ ...req.body, password: hash });

    //saving to db
    await newUser.save();
    res.status(200).send('User has been created.');
  } catch (err) {
    next(err);
  }
};

//salt + password  =  random hash

export const signin = async (req, res, next) => {
  try {
    
    const user = await User.findOne({ name: req.body.name });
    if (!user) {
      return next(createError(404, 'No user found!'));
    }

    const isCorrect = await bcrypt.compare(req.body.password, user.password);

    if (!isCorrect) return next(createError(400, 'Wrong Credentials!'));
    

    const token = jwt.sign({ id: user._id }, process.env.JWT);

    const {password,...others} = user._doc
    res
      .cookie('access_token', token, {
        httpOnly: true,
      })
      .status(200)
      .json(others);
  } catch (err) {
    next(err);
  }
};
