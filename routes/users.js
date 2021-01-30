import express from "express";
import { signin, signup } from "../controllers/users.js";
const router = express.Router();

router.get("/signin", signin);
router.post("/signup", signup);

export default router;
