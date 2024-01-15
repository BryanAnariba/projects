import multer from "multer";
import { getUUID } from "./uuid";

const storage = multer.diskStorage({
  destination: function (req, file, cb ) {
    cb(null, __dirname + '../../../uploads');
  },
  filename: function (req, file, cb) {
    const id = getUUID();
    const imageExtention = file.originalname.split('.').pop();
    cb(null, id + '.' + imageExtention);
  }
});

export const upload = multer({storage: storage});