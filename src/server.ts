import mongoose from "mongoose";
import app from "./app";
import config from "./app/config";

const port = config.port || 5000;

async function main() {
  try {
    await mongoose.connect(config.database_url as string);

    app.listen(port, () => {
      console.log("app is running on port", port);
    });
  } catch (err) {
    console.log(err);
  }
}

main();
