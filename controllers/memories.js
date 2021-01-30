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
  const { id } = req.params;
  const memory = req.body;

  if (!mongoose.Type.ObjectId.isValid(id))
    return res.status(404).send("Now Memory with this Id");

  const updateMemory = await Memory.findByIdAndUpdate(id, memory, {
    new: true,
  });

  res.json(updateMemory);
};

export const deleteMemory = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Type.ObjectId.isValid(id))
    return res.status(404).send("Now Memory with this Id");

  await Memory.findByIdAndRemove(id);

  res.json({ message: "Memory deleted successfully" });
};

export const likeMemory = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Type.ObjectId.isValid(id))
    return res.status(404).send("Now Memory with this Id");

  const memory = await Memory.findById(id);
  const updatedMemory = await Memory.findByIdAndRemove(
    id,
    { likeCount: memory.likeCount + 1 },
    { new: true }
  );

  res.json(updatedMemory);
};
