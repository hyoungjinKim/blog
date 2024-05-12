import dotenv from "dotenv";

dotenv.config();

export default {
  MONGO_URI: process.env.MONGO_URI,
  JWT_SECRET: process.env.JWT_SECRET,
  PORT: process.env.PORT,
  AWS_KEY: process.env.AWS_KEY,
  AWS_PRIVATE_KEY: process.env.AWS_PRIVATE_KEY,
};
