const express = require('express');
const { getConnection } = require('../db/db_utils');

const router = express.Router();
let tasks = [];

// Get all tasks
router.get('/', (req, res) => {
    res.json(tasks);
});

// Create a new task
router.post('/new-task', (req, res) => {
    const { title, description } = req.body;
    const newTask = { id: tasks.length + 1, title, description, isDone: false };
    tasks.push(newTask);
    res.json(newTask);
});

// Update a task
router.put('/update-task/:id', (req, res) => {
    const { id } = req.params;
    const { title, description, isDone } = req.body;

    const task = tasks.find(t => t.id == id);
    if (task) {
        task.title = title || task.title;
        task.description = description || task.description;
        task.isDone = isDone !== undefined ? isDone : task.isDone;
        return res.json(task);
    }
    res.status(404).json({ message: 'Task not found' });
});

// Delete a task
router.delete('/delete-task/:id', (req, res) => {
    const { id } = req.params;
    tasks = tasks.filter(t => t.id != id);
    res.json({ message: 'Task deleted' });
});

module.exports = router;
