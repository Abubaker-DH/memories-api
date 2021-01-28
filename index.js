import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

app.use(cors());

const MONGO_URL = "mongodb://localhost:27017/momeries-db";
const PORT = process.env.PORT || 5000;

mongoose
  .connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () => console.log(`server running on port ${PORT} ...`))
  )
  .catch((error) => console.log(error.message));
// just to don't get any wornig in console
mongoose.set("useFindAndModify", false);
