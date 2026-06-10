import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({

  destination: (req, file, cb) => {

    if (file.fieldname === 'companyLogo') {

      cb(null, 'uploads/logos');

    }

    else if (file.fieldname === 'profileImage') {

      cb(null, 'uploads/profiles');

    }

    else {

      cb(null, 'uploads/portfolio');

    }

  },

  filename: (req, file, cb) => {

    cb(
      null,
      Date.now() +
      path.extname(file.originalname)
    );

  }

});

export default multer({
  storage
});