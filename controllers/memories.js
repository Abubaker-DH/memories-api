import Memory from "../models/memory.js";

export const getMemories = async (req, res) => {
  try {
    const memories = await Memory.find();
    res.status(200).json(memories);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createMemory = async (req, res) => {
  const memory = req.body;
  const newMemory = new Memory(memory);
  try {
    await newMemory.save();
    res.status(201).json(newMemory);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updateMemory = async (req, res) => {
  res.send(" hhhhh");
};

export const deleteMemory = async (req, res) => {
  res.send(" hhhhh");
};
