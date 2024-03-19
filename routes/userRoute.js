import express from 'express';
import {
  deleteUser,
  dislike,
  getAUser,
  like,
  subscribe,
  unsubscribe,
  update,
} from '../controllers/userController.js';
import { verifyToken } from '../utils/verifyToken.js';

const router = express.Router();

//update user
router.put('/:id', verifyToken, update);
//delete user
router.delete('/:id', verifyToken, deleteUser);
//get a user
router.get('/find/:id', getAUser);
//subscribe a user
router.put('/sub/:id', verifyToken, subscribe);
//unsubscribe a user
router.put('/unsub/:id', verifyToken, unsubscribe);
//like a video
router.put('/like/:videoId', verifyToken, like);
//dislike a video
router.put('/dislike/:videoId', verifyToken, dislike);

export default router;
