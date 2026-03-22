
const Task=require("../model/taskModel")

exports.createTask = async (req, res) => {
    try {
        const { title, date, status } = req.body;
        if(!title || !date || !status) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const task = await Task.create({ title, date, status });
        res.status(201).json(task);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
// Get All Tasks (with search support)
exports.getTasks = async (req, res) => {
  try {
    const { search } = req.query;

    let filter = {};

    if (search && search.trim() !== "") {
      filter.title = { $regex: search, $options: "i" }; 
    }

    const tasks = await Task.find(filter);

    return res.status(200).json({
      success: true,
      count: tasks.length,
      data: tasks,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
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
