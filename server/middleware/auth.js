import jwt from "jsonwebtoken";
import config from "../config/index";
const { JWT_SECRET } = config;

const auth = (req, res, next) => {
  console.log("auth");

  const token = req.header("x-auth-token");
  if (!token) {
    return res.status(401).json({ msg: "토큰 없음. 인증 거부됨" });
  }
  try {
    const decode = jwt.verify(token, JWT_SECRET);
    req.user = decode;
    next();
  } catch (err) {
    console.log(err);
    res.status(400).json({ msg: "토큰이 유효하지 않습니다." });
  }
};

export default auth;
