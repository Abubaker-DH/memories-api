import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import memoryRoutes from "./routes/memories.js";

const app = express();
dotenv.config();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/memories", memoryRoutes);
app.get("/", (req, res, next) => {
  res.send("Hello to Memories Api");
});

const MONGO_URL = process.env.MONGO_URL;
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
