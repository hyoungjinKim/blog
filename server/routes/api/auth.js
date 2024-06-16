import express from "express";
import jwt from "jsonwebtoken";
import auth from "../../middleware/auth";
import config from "../../config/index";
import bcrypt from "bcryptjs";

const { JWT_SECRET } = config;

import User from "../../models/user";
import Comment from "../../models/comment";
import Post from "../../models/post";
import Category from "../../models/category";
const router = express.Router();

router.post("/", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ msg: "모든 필드를 채워주세요" });
  }
  await User.findOne({ email }).then((user) => {
    if (!user) {
      return res.status(400).json({ msg: "유저가 존재하지 않습니다." });
    }
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (!isMatch) {
        return res.status(400).json({ msg: "비밀번호가 일치하지 않습니다." });
      }
      jwt.sign(
        { id: user.id },
        JWT_SECRET,
        { expiresIn: "2days" },
        (err, token) => {
          if (err) {
            throw err;
          }
          res.json({
            token,
            user: { id: user.id, name: user.name, role: user.role },
          });
        }
      );
    });
  });
});

router.post("/logout", (req, res) => {
  res.json("로그아웃 성공");
});

router.get("/user", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      throw Error("유저가 존재하지 않습니다.");
    }
    res.json(user);
  } catch (err) {
    console.log(err);
    res.status(400).json({ msg: err.message });
  }
});

router.post("/username/:info", auth, async (req, res, next) => {
  try {
    const name = req.body.name1;
    console.log(name);
    const result = await User.findByIdAndUpdate(
      req.params.info,
      {
        $set: {
          name: name,
        },
      },
      { new: true }
    );
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    next(err);
  }
});

router.post("/useremail/:info", auth, async (req, res, next) => {
  try {
    console.log(req.params.info);
    const email = req.body.email1;
    console.log(email);
    const result = await User.findByIdAndUpdate(
      req.params.info,
      {
        $set: {
          email: email,
        },
      },
      { new: true }
    );
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    next(err);
  }
});

router.post("/userpassword/:info", auth, async (req, res, next) => {
  try {
    console.log(req.params.info);
    const password = req.body.password1;
    console.log(password);
    const result = await User.findByIdAndUpdate(
      req.params.info,
      {
        $set: {
          password: password,
        },
      },
      { new: true }
    );
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(result.password, salt, async (err, hash) => {
        if (err) {
          console.log("Err");
          return;
        } else {
          result.password = hash;
          await result.save();
        }
      });
    });
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    next(err);
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    const userId = req.params.id;

    await User.deleteMany({ _id: userId });

    const comments = await Comment.find({ creator: userId });
    if (comments.length > 0) {
      await Comment.deleteMany({ creator: userId });
    }

    const posts = await Post.find({ creator: userId });
    if (posts.length > 0) {
      const postIds = posts.map((post) => post._id);
      await Post.deleteMany({ creator: userId });

      await Category.updateMany(
        { posts: { $in: postIds } },
        { $pull: { posts: { $in: postIds } } }
      );

      const categories = await Category.find();
      for (const category of categories) {
        if (category.posts.length === 0) {
          await Category.deleteOne({ _id: category._id });
        }
      }
    }
    res.status(200).json({ msg: "user Delete" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

export default router;
