import express from 'express';
import {
  addVideo,
  addView,
  deleteVideo,
  getVideo,
  randomVideo,
  search,
  sub,
  tags,
  trend,
  updateVideo,
} from '../controllers/videoController.js';
import { verifyToken } from '../utils/verifyToken.js';

const router = express.Router();

//create a video
router.post('/', verifyToken, addVideo);

//update video
router.put(':id', verifyToken, updateVideo);

//delete video
router.delete('/:id', verifyToken, deleteVideo);

//get a video
router.get('/find/:id', getVideo);

//update views
router.put('/view/:id', addView);

router.get('/trend', trend);
router.get('/random', randomVideo);
router.get('/sub', verifyToken, sub);
router.get('/tags', tags);
router.get('/search', search);
export default router;
