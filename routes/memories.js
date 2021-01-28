import express from "express";
import {
  getMemories,
  createMemory,
  updateMemory,
  deleteMemory,
} from "../controllers/memories.js";
const router = express.Router();

router.get("/", getMemories);
router.post("/", createMemory);
router.put("/", updateMemory);
router.delete("/", deleteMemory);

export default router;
