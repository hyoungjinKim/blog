import express from "express";
import Post from "../../models/post";
import Category from "../../models/category";
import User from "../../models/user";
import Comment from "../../models/comment";
import auth from "../../middleware/auth";
import config from "../../config/index";
const router = express.Router();

import multerS3 from "multer-s3";
import path from "path";
//import AWS from "aws-sdk";
import multer from "multer";
import moment from "moment";
const { AWS_KEY, AWS_PRIVATE_KEY } = config;

// const s3 = new AWS.S3({
//   accessKeyId: AWS_KEY,
//   secretAccessKey: AWS_PRIVATE_KEY,
// });

// const uploadS3 = multer({
//   storage: multerS3({
//     s3,
//     bucket: "sideproject1220/upload",
//     region: "ap-northeast-2",
//     key(req, file, cb) {
//       const ext = path.extname(file.originalname);
//       const basename = path.basename(file.originalname, ext);
//       cb(null, basename + new Date().valueOf() + ext);
//     },
//   }),
//   limits: { fileSize: 100 * 1024 * 1024 },
// });

// router.post("/image", uploadS3.array("upload", 5), async (req, res, next) => {
//   try {
//     res.json({ uploaded: true, url: req.files.map((v) => v.location) });
//   } catch (e) {
//     console.error(e);
//     console.log("--------------------");
//     res.json({ uploaded: false, url: null });
//   }
// });

//@route GET api/post
//@desc More Loading Post
//@access public
router.get("/skip/:skip", async (req, res) => {
  try {
    const postCount = await Post.countDocuments();

    const postFindResult = await Post.find()
      .populate("creator", "name")
      .skip(Number(req.params.skip))
      .limit(6)
      .sort({ date: -1 });
    const categoryFindResult = await Category.find();
    const result = { postFindResult, categoryFindResult, postCount };
    res.json(result);
  } catch (err) {
    console.log(err);
    res.json({ msg: "더 이상 포스트가 없습니다." });
  }
});

router.post("/", auth, async (req, res, next) => {
  try {
    console.log(2);

    const { title, contents, fileUrl, creator, category } = req.body;
    console.log(3);

    const newPost = await Post.create({
      title,
      contents,
      fileUrl,
      creator: req.user.id,
      date: moment().format("YYYY-MM-DD HH:mm:ss"),
    });
    const finedResult = await Category.findOne({
      categoryName: category,
    });

    console.log(finedResult, "fined category");
    if (!finedResult) {
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
    await post.save();
    res.json(post);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

//comment Route
//@route Get api/post/comments
//@desc Get All Comments
//@access public

router.get("/:id/comments", async (req, res) => {
  try {
    const comment = await Post.findById(req.params.id).populate({
      path: "comments",
    });
    const result = comment.comments;
    res.json(result);
  } catch (e) {
    console.log(e);
  }
});

router.post("/:id/comments", async (req, res, next) => {
  const newComment = await Comment.create({
    contents: req.body.contents,
    creator: req.body.userId,
    creatorName: req.body.userName,
    post: req.body.id,
    date: moment().format("YYYY-MM-DD HH:mm:ss"),
  });
  console.log(newComment, "newComment");
  try {
    await Post.findByIdAndUpdate(req.body.id, {
      $push: {
        comments: newComment._id,
      },
    });
    await User.findByIdAndUpdate(req.body.userId, {
      $push: {
        comments: {
          post_id: req.body.id,
          comment_id: newComment._id,
        },
      },
    });
    res.json(newComment);
  } catch (err) {
    console.log(err);
    next(err);
  }
});

//@route Delete api/post/:id
//@dexd Delete a Post
// @access Private
router.delete("/:id", auth, async (req, res) => {
  await Post.deleteMany({ _id: req.params.id });
  await Comment.deleteMany({ post: req.params.id });
  await User.findByIdAndUpdate(req.user.id, {
    $pull: {
      posts: req.params.id,
      comments: { post_id: req.params.id },
    },
  });
  const CategoryUpdateResult = await Category.findOneAndUpdate(
    { posts: req.params.id },
    { $pull: { posts: req.params.id } },
    { new: true }
  );
  console.log(CategoryUpdateResult);

  if (CategoryUpdateResult.posts.length === 0) {
    await Category.deleteMany({ _id: CategoryUpdateResult });
  }
  return res.json({ success: true });
});

//@route GET api/post/:id/edit
//@desc Edit Post
//@access Private
router.get("/:id/edit", auth, async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id).populate("creator", "name");
    res.json(post);
  } catch (err) {
    console.log(err);
  }
});

router.post("/:id/edit", auth, async (req, res, next) => {
  const {
    body: { title, contents, fileUrl, id },
  } = req;

  try {
    const modified_post = await Post.findByIdAndUpdate(
      id,
      {
        title,
        contents,
        fileUrl,
        date: moment().format("YYYY-MM-DD HH:mm:ss"),
      },
      { new: true }
    );
    console.log(modified_post, "edit modify");
    res.redirect(`/api/post/${modified_post.id}`);
  } catch (err) {
    console.log(err);
    next(err);
  }
});

router.get("/category/:categoryName", async (req, res, next) => {
  try {
    const result = await Category.findOne(
      {
        categoryName: {
          $regex: req.params.categoryName,
          $options: "i",
        },
      },
      "posts"
    ).populate({ path: "posts" });
    console.log(result, "Category Find result");
    res.json(result);
  } catch (e) {
    console.log(e);
    next(e);
  }
});

export default router;
