import express from "express";
import Post from "../../models/post";
import Category from "../../models/category";
import User from "../../models/user";

import auth from "../../middleware/auth";
import config from "../../config/index";
const router = express.Router();

import multerS3 from "multer-s3";
import path from "path";
import AWS from "aws-sdk";
import multer from "multer";
import moment from "moment";
const { AWS_KEY, AWS_PRIVATE_KEY } = config;

const s3 = new AWS.S3({
  accessKeyId: AWS_KEY,
  secretAccessKey: AWS_PRIVATE_KEY,
});

const uploadS3 = multer({
  storage: multerS3({
    s3,
    bucket: "s3://sideproject1220/upload/",
    region: "ap-northeast-2",
    key(req, file, cb) {
      const ext = path.extname(file.originalname);
      const basename = path.basename(file.originalname, ext);
      cb(null, basename + new Date().valueOf() + ext);
    },
  }),
  limits: { fileSize: 100 * 1024 * 1024 },
});

router.post("/image", uploadS3.array("upload", 5), async (req, res, next) => {
  try {
    console.log(req.files.map((v) => v.location));
    res.json({ uploaded: true, url: req.files.map((v) => v.location) });
  } catch (e) {
    console.error(e);
    console.log("--------------------");
    res.json({ uploaded: false, url: null });
  }
});

router.get("/", async (req, res) => {
  const postFindResult = await Post.find();
  console.log(postFindResult, "All Post Get");
  res.json(postFindResult);
});

router.post("/", auth, uploadS3.none(), async (req, res, next) => {
  try {
    console.log(req, "req");
    const { title, contents, fileUrl, creator, category } = req.body;
    const newPost = await Post.create({
      title,
      contents,
      fileUrl,
      creator,
      date: moment.defaultFormat("YYYY-MM-DD"),
    });

    const finedResult = await Category.findOne({
      categoryName: category,
    });

    console.log(finedResult, "fined categoty");
    const finedResultValue = typeof finedResult;
    if (finedResultValue === undefined || finedResultValue === null) {
      const newCategory = await Category.create({
        categoryName: category,
      });
      await Post.findByIdAndUpdate(newPost._id, {
        $push: { category: newCategory._id },
      });
      await Category.findByIdAndUpdate(newCategory._id, {
        $push: { posts: newPost._id },
      });

      await User.findByIdAndUpdate(req.user.id, {
        $push: {
          posts: newPost._id,
        },
      });
    } else {
      await Category.findByIdAndUpdate(finedResult._id, {
        $push: { posts: newPost._id },
      });
      await Post.findByIdAndUpdate(newPost._id, {
        category: finedResult._id,
      });
      await User.findByIdAndUpdate(req.user.id, {
        $push: {
          posts: newPost._id,
        },
      });
    }
    return res.redirect(`/api/post/${newPost._id}`);
  } catch (err) {
    console.log(err);
  }
});

//@route Post api/post/:id
//@desc  Detail Post
//@access Public

router.get("/:id", async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate("creator", "name")
      .populate({ path: "category", select: "categoryName" });
    post.views += 1;
    post.save();
    console.log(post, "post");
    res.json(post);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

export default router;
