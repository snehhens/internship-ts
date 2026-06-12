import mongoose, {
  Document,
  Schema
} from 'mongoose';

export interface IUpload extends Document {

  userId:
    mongoose.Types.ObjectId;

  fileUrl:
    string;

  fileType:
    string;

  originalName:
    string;

  createdAt?:
    Date;

}

const uploadSchema =
  new Schema<IUpload>(

    {

      userId: {

        type:
          mongoose.Schema.Types.ObjectId,

        ref:
          'User',

        required:
          true

      },

      fileUrl: {

        type:
          String,

        required:
          true

      },

      fileType: {

        type:
          String,

        required:
          true

      },

      originalName: {

        type:
          String,

        required:
          true

      }

    },

    {

      timestamps:
        true

    }

  );

const Upload =
  mongoose.model<IUpload>(

    'Upload',

    uploadSchema

  );

export default Upload;