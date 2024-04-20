import dotenv from "dotenv-webpack";
dotenv.config();

module.exports = {
  plugins: [new DotenvWebpack()],
};
