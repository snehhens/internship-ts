import { Request, Response } from 'express';
import Upload from '../models/Upload';

export const savePortfolioMedia = async (
  req: Request,
  res: Response
) => {

  try {

    const {
      userId,
      fileUrl,
      fileType,
      originalName
    } = req.body;

    const upload =
      new Upload({

        userId,
        fileUrl,
        fileType,
        originalName

      });

    await upload.save();

    return res.status(201).json(upload);

  }

  catch (error) {

    console.log(error);

    return res.status(500).json({

      message:
        'Server Error'

    });

  }

};

export const getUserUploads = async (
  req: Request,
  res: Response
) => {

  try {

    const uploads =
      await Upload.find({

        userId:
          req.params.userId

      })
      .sort({
        createdAt: -1
      });

    return res.json(uploads);

  }

  catch (error) {

    console.log(error);

    return res.status(500).json({

      message:
        'Server Error'

    });

  }

};