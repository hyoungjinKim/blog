import express from "express";
import mongoose from "mongoose";
import config from "./config";
const app = express();
const { MONGO_URI } = config;

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => {
    console.log(err);
  });
export default app;
