import express from "express";
const router = express.Router();
import Post from "../../models/post";

router.get("/:searchTerm", async (req, res, next) => {
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

export default router;
