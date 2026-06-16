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

    const extension =
      path.extname(file.originalname);

    const baseName =
      path.basename(file.originalname, extension)
        .replace(/[^a-zA-Z0-9-_]/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '') || 'file';

    const now =
      new Date();

    const timestamp =
      [
        now.getFullYear(),
        String(now.getMonth() + 1).padStart(2, '0'),
        String(now.getDate()).padStart(2, '0')
      ].join('') +
      '-' +
      [
        String(now.getHours()).padStart(2, '0'),
        String(now.getMinutes()).padStart(2, '0'),
        String(now.getSeconds()).padStart(2, '0')
      ].join('') +
      '-' +
      String(now.getMilliseconds()).padStart(3, '0');

    cb(
      null,
      `${baseName}-${timestamp}${extension}`
    );

  }

});

export default multer({
  storage
});
