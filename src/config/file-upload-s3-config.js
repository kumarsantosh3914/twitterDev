import multer from "multer";
import multerS3 from "multer-s3";
import aws from "aws-sdk";
import dotenv from "dotenv";

dotenv.config();

aws.config.update({
  region: process.env.AWS_REGION,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  accessKeyId: process.env.ACCESS_KEY_ID,
});

const s3 = new aws.S3();

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "twitterdev",
    acl: "public-read",
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString());
    },
  }),
});

export default upload;

// import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
// import multer from "multer";
// import multerS3 from "multer-s3";
// import dotenv from "dotenv";

// dotenv.config();

// const s3Client = new S3Client({
//   region: process.env.AWS_REGION,
//   credentials: {
//     secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//     accessKeyId: process.env.ACCESS_KEY_ID,
//   },
// });

// const upload = multer({
//   storage: multerS3({
//     s3: s3Client,
//     bucket: "twitterdev",
//     acl: "public-read",
//     metadata: function (req, file, cb) {
//       cb(null, { fieldName: file.fieldname });
//     },
//     key: function (req, file, cb) {
//       cb(null, Date.now().toString());
//     },
//   }),
// });

// export default upload;
