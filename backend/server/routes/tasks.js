const express = require('express');
const router = express.Router();
const Task = require('../models/task');
const User = require('../models/client');

// Add a new task and associate it with a user
router.post('/tasks', async (req, res) => {
    const { title, description, userId } = req.body;

    if (!title || !description || !userId) {
        return res.status(400).json({ message: 'Title, description, and userId are required' });
    }

    try {
        // Check if the user exists
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Create a new task and associate it with the user
        const newTask = new Task({
            title,
            description,
            userId, // Associating the task with the user
        });

        await newTask.save();  // Save task to the database
        res.status(201).json({ message: 'Task added successfully', task: newTask });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
});

module.exports = router;
/**
 * Get all tasks
 */
router.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch tasks' });
    }
});

/**
 * Get a single task by ID
 */
router.get('/tasks/:id', async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.json(task);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch task' });
    }
});

/**
 * Update a task by ID
 */
router.put('/tasks/:id', async (req, res) => {
    const { title, description, userId } = req.body;
    try {
        const updatedTask = await Task.findByIdAndUpdate(
            req.params.id,
            { title, description, userId },
            { new: true }
        );
        if (!updatedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.json({ message: 'Task updated successfully', task: updatedTask });
    } catch (error) {
        res.status(500).json({ message: 'Failed to update task' });
    }
});

/**
 * Delete a task by ID
 */
router.delete('/tasks/:id', async (req, res) => {
    try {
        const deletedTask = await Task.findByIdAndDelete(req.params.id);
        if (!deletedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.json({ message: 'Task deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete task' });
    }
});
