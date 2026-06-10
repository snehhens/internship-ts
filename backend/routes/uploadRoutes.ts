import express from 'express';

import upload from
'../middleware/uploadMiddleware';

const router = express.Router();

router.post(
  '/profile-image',
  upload.single('profileImage'),
  (req, res) => {

    res.json({

      fileUrl:
      `/uploads/profiles/${req.file?.filename}`

    });

  }
);

export default router;