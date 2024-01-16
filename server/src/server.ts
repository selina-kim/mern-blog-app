import app from "./app";
import env from "./util/validateEnv";
import mongoose from "mongoose";

const PORT = env.PORT;

mongoose
  .connect(env.MONGO_URL)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`listening on port ${PORT}`);
    });
  })
  .catch(console.error);
