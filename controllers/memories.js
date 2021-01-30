import Memory from "../models/memory.js";

export const getMemories = async (req, res) => {
  try {
    const memories = await Memory.find();
    res.status(200).json(memories);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getMemory = async (req, res) => {
  const { id } = req.params;
  if (!req.userId) return res.json({ message: "Unauthenticated.." });
  try {
    const memories = await Memory.findById(id);
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
  const updateMemory = req.body;

  if (!req.userId) return res.json({ message: "Unauthenticated.." });

  if (!mongoose.Type.ObjectId.isValid(id))
    return res.status(404).send("Now Memory with this Id");

  const memory = await Memory.findById(id);

  const updatedMemory;
  if (String(memory.userId) === String(req.userId)) {
    updatedMemory = await Memory.findByIdAndUpdate(id, updateMemory, {
      new: true,
    });
  }
  res.json(updatedMemory);
};

export const deleteMemory = async (req, res) => {
  const { id } = req.params;

  if (!req.userId) return res.json({ message: "Unauthenticated.." });

  if (!mongoose.Type.ObjectId.isValid(id))
    return res.status(404).send("Now Memory with this Id");

  const memory = await Memory.findById(id);

  if (String(memory.userId) === String(req.userId)) {
    await Memory.findByIdAndRemove(id);
  }
  res.json({ message: "Memory deleted successfully" });
};

export const likeMemory = async (req, res) => {
  const { id } = req.params;

  if (!req.userId) return res.json({ message: "Unauthenticated.." });

  if (!mongoose.Type.ObjectId.isValid(id))
    return res.status(404).send("Now Memory with this Id");

  const memory = await Memory.findById(id);

  // Check if the userId in the list of likeUser
  const index = memory.likes.findIndex((id) => id === String(req.userId));

  // if the id doesn't exist
  if (index === -1) {
    // like the post
    memory.likes.push(req.userId);
  } else {
    // disLike the post
    memory.likes = memory.likes.filter((id) => id !== String(req.userId));
  }
  const updatedMemory = await Memory.findByIdAndRemove(id, memory, {
    new: true,
  });

  res.json(updatedMemory);
};
