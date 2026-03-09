
const Task=require("../model/taskModel")

exports.createTask = async (req, res) => {
    try {
        const { title, date, status } = req.body;
        const task = await Task.create({ title, date, status });
        res.status(201).json(task);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find();
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, date } = req.body;
        
        const task = await Task.findOneAndUpdate(
            { _id: id }, 
            { title, date },
            { new: true }
        );
        
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }
        res.status(200).json(task);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a task
exports.deleteTask = async (req, res) => {
    try {
        const { id } = req.params;
        const task = await Task.findOneAndDelete({ _id: id });
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }
        res.status(200).json({ message: "Task deleted successfully" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};




exports.updateTaskStatus = async (req, res) => {
  try {
    const { id } = req.params;
          const allTasks = await Task.find({ _id: id });
    const { status } = req.body;
    const task = await Task.findByIdAndUpdate(
     { _id: id },
      { status },
      { new: true }
    );
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: "Failed to update status" });
  }
};

exports.getTaskById = async (req, res) => {
    try {
        const { id } = req.params;
        const task = await Task.findOne({ _id: id });
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }
        res.status(200).json(task);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
