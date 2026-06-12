import path from 'path';

import express from 'express';

import upload from
'../middleware/uploadMiddleware';

import Upload from '../models/Upload';
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

router.post(
  '/portfolio-media',
  upload.single('portfolioMedia'),
  //upload.array('portfolioMedia', 20),
  async (req, res) => {

    const extension =
      path.extname(
        req.file?.originalname || ''
      ).toLowerCase();

    const imageExtensions = [
      '.jpg',
      '.jpeg',
      '.png',
      '.webp'
    ];

    const fileType =
      imageExtensions.includes(extension)
        ? 'image'
        : 'video';

    res.json({

      fileUrl:
        `/uploads/portfolio/${req.file?.filename}`,

      fileType,

      originalName:
        req.file?.originalname

    });

  }
);

router.post(
  '/save-portfolio',
  async (req, res) => {

    try {

      const upload =
        await Upload.create({

          userId:
            req.body.userId,

          fileUrl:
            req.body.fileUrl,

          fileType:
            req.body.fileType,

          originalName:
            req.body.originalName

        });

      res.status(201).json(upload);

    }

    catch (error) {

      console.log(error);

      res.status(500).json({
        message:
          'Could not save upload'
      });

    }

  }
);

router.get(
  '/portfolio/:userId',
  async (req, res) => {

    try {

      const uploads =
        await Upload.find({

          userId:
            req.params.userId

        })
        .sort({
          createdAt: -1
        });

      res.json(uploads);

    }

    catch (error) {

      console.log(error);

      res.status(500).json({
        message:
          'Could not fetch uploads'
      });

    }

  }
);

export default router;