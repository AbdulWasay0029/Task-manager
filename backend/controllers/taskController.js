const Task = require('../models/Task');
const User = require('../models/User');

// @desc    Get all tasks created by the logged-in user
// @route   GET /api/tasks/my
// @access  Private
const getMyTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ createdBy: req.user.id })
            .populate('assignedTo', 'name email'); // Populate detailed info for assigned user
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get tasks assigned to the logged-in user
// @route   GET /api/tasks/assigned
// @access  Private
const getAssignedTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ assignedTo: req.user.id })
            .populate('createdBy', 'name email');
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a new task
// @route   POST /api/tasks/create
// @access  Private
const createTask = async (req, res) => {
    const { title, description, assignedToEmail } = req.body;

    if (!title) {
        return res.status(400).json({ message: 'Please add a title' });
    }

    let assignedToId = null;

    // If email is provided, find the user to assign
    if (assignedToEmail) {
        const assignedUser = await User.findOne({ email: assignedToEmail });
        if (!assignedUser) {
            return res.status(404).json({ message: 'Assigned user not found' });
        }
        assignedToId = assignedUser.id;
    }

    try {
        const task = await Task.create({
            title,
            description,
            createdBy: req.user.id,
            assignedTo: assignedToId,
        });

        res.status(201).json(task);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update task
// @route   PUT /api/tasks/update/:id
// @access  Private
const updateTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        // Check if user is the creator
        if (task.createdBy.toString() !== req.user.id) {
            return res.status(401).json({ message: 'User not authorized' });
        }

        const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });

        res.status(200).json(updatedTask);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete task
// @route   DELETE /api/tasks/delete/:id
// @access  Private
const deleteTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        // Check if user is the creator
        if (task.createdBy.toString() !== req.user.id) {
            return res.status(401).json({ message: 'User not authorized' });
        }

        await task.deleteOne();

        res.status(200).json({ id: req.params.id });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Toggle task completion status
// @route   PUT /api/tasks/toggle/:id
// @access  Private
const toggleTaskStatus = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        // Allow creator OR assigned user to toggle status
        if (
            task.createdBy.toString() !== req.user.id &&
            task.assignedTo?.toString() !== req.user.id
        ) {
            return res.status(401).json({ message: 'User not authorized' });
        }

        task.status = task.status === 'completed' ? 'pending' : 'completed';
        await task.save();

        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getMyTasks,
    getAssignedTasks,
    createTask,
    updateTask,
    deleteTask,
    toggleTaskStatus,
};
