import express, { json } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import auth from "../../middleware/auth";
import User from "../../models/user";
import config from "../../config/index";
const { JWT_SECRET } = config;

const router = express.Router();
const { S3Client } = require("@aws-sdk/client-s3");
const multerS3 = require("multer-s3");
const path = require("path");
import multer from "multer";

const { AWS_KEY, AWS_PRIVATE_KEY } = config;

const s3 = new S3Client({
  credentials: {
    accessKeyId: AWS_KEY,
    secretAccessKey: AWS_PRIVATE_KEY,
  },
  region: "ap-northeast-2", // S3 버킷의 리전
});

const uploadS3 = multer({
  storage: multerS3({
    s3,
    bucket: "sideproject1220",
    acl: "public-read",
    key(req, file, cb) {
      const ext = path.extname(file.originalname);
      const basename = path.basename(file.originalname, ext);
      cb(null, `${basename}-${Date.now()}${ext}`);
    },
  }),
  limits: { fileSize: 100 * 1024 * 1024 },
});

router.post("/image", uploadS3.single("upload"), async (req, res, next) => {
  try {
    console.log(req.file);
    if (!req.file) {
      return res
        .status(400)
        .json({ uploaded: false, message: "No file uploaded" });
    }
    const url = req.file.location;
    res.json({ uploaded: true, url: [url] });
  } catch (e) {
    console.error(e);
    res.status(500).json({ uploaded: false, message: "Server error" });
  }
});

//@routes GET api/user
//@desc Get all user
//@access piblic
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    if (users.length === 0) {
      console.log("no users");
      throw Error("No users");
    }
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: error.message });
  }
});

//@routes POST api/user
//@desc Register user
//@access piblic
router.post("/", async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ msg: "모든 필드를 채워주세요" });
  }

  //check for exising user
  const user = await User.findOne({ email });
  console.log(user);
  if (user) {
    return res.status(400).json({ msg: "이미 가입된 유저가 존재합니다." });
  } else {
    const newUser = await new User({
      name,
      email,
      password,
    });
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, async (err, hash) => {
        if (err) {
          console.log("Err");
          return;
        } else {
          newUser.password = hash;
          await newUser.save().then((user) => {
            jwt.sign(
              { id: user.id },
              JWT_SECRET,
              { expiresIn: 3600 },
              (err, token) => {
                if (err) {
                  console.log("Err");
                  return;
                }
                res.json({
                  token,
                  user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                  },
                });
              }
            );
          });
        }
      });
    });
  }
});

//@route GET api/user/:userid/profile
//@desc
//@access Private

router.get("/:userid/profile", async (req, res) => {
  try {
    const result = await User.findById(req.params.userid).populate({
      path: "posts",
      populate: {
        path: "category",
      },
    });
    res.json(result);
  } catch (err) {
    console.log(err, "err");
  }
});

router.post("/userImg/:id", auth, uploadS3.none(), async (req, res) => {
  try {
    const userId = req.params.id;
    const imgUrl = req.body.profile_Url;
    console.log(imgUrl, "imgUrl");
    const result = await User.findByIdAndUpdate(
      userId,
      {
        $set: { profile_imgUrl: imgUrl },
      },
      { new: true }
    );
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "imgupload failed" });
  }
});

router.post("/proflieDelete/:id", auth, async (req, res) => {
  try {
    const userId = req.params.id;
    const imgUrl = req.body.profile_Url;
    console.log(imgUrl);
    const result = await User.findByIdAndUpdate(
      userId,
      {
        $set: {
          profile_imgUrl: imgUrl,
        },
      },
      { new: true }
    );

    res
      .status(200)
      .json({ msg: "Profile image updated to default", user: result });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Image upload failed" });
  }
});
export default router;
