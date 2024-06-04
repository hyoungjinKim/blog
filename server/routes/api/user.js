import express, { json } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../../models/user";
import config from "../../config/index";
const { JWT_SECRET } = config;

const router = express.Router();

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

//@route POST api/user/:username/profile
//@desc POST Edit Password
//@access Private

router.post("/:userName/profile", async (req, res) => {
  try {
    const {} = req.body;
  } catch (err) {
    console.log(err);
  }
});
export default router;
