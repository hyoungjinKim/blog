import app from "./app";
import config from "./config/index";
const { PORT } = config;
console.log(PORT);
app.listen(PORT, () => {
  console.log(`open server ${PORT}`);
});
