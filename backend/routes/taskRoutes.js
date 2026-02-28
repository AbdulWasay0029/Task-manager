const express = require('express');
const router = express.Router();
const {
    getMyTasks,
    getAssignedTasks,
    createTask,
    updateTask,
    deleteTask,
    toggleTaskStatus,
} = require('../controllers/taskController');
const { protect } = require('../middleware/authMiddleware');

// All routes are protected
router.get('/my', protect, getMyTasks);
router.get('/assigned', protect, getAssignedTasks);
router.post('/create', protect, createTask);
router.put('/update/:id', protect, updateTask);
router.delete('/delete/:id', protect, deleteTask);
router.put('/toggle/:id', protect, toggleTaskStatus);

module.exports = router;
