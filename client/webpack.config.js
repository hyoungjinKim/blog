import dotenv from "dotenv-webpack";
dotenv.config();

module.exports = {
  plugins: [new DotenvWebpack(process.env.REACT_APP_BASIC_SERVER_URL)],
};
