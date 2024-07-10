import express from "express";
const router = express.Router();
import Post from "../../models/post";
import User from "../../models/user";

router.get("/:searchTerm", async (req, res, next) => {
  console.log(req.params.searchTerm);
  try {
    const result = await Post.find({
      title: {
        $regex: req.params.searchTerm,
        $options: "i",
      },
    }).populate("creator", "name");
    console.log(result, "Search result");
    res.json(result);
  } catch (e) {
    console.log(e);
    next(e);
  }
});

router.get("/:userid/:searchTerm/profile", async (req, res) => {
  try {
    const result = await User.findById(req.params.userid).populate({
      path: "posts",
      match: {
        title: {
          $regex: req.params.searchTerm,
          $options: "i",
        },
      },
      populate: {
        path: "category",
      },
    });
    console.log(result, "searchResult");
    res.json(result);
  } catch (err) {
    console.log(err, "err");
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;
