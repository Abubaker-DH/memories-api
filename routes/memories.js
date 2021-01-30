import express from "express";
import {
  getMemories,
  getMemory,
  createMemory,
  updateMemory,
  deleteMemory,
  likeMemory,
} from "../controllers/memories.js";
import auth from "../middleware/auth.js";
const router = express.Router();

router.get("/", getMemories);
router.get("/:id", auth, getMemory);
router.post("/", auth, createMemory);
router.put("/:id", auth, updateMemory);
router.delete("/:id", auth, deleteMemory);
router.patch("/:id/likeMemory", auth, likeMemory);

export default router;
