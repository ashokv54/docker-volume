// routes/todos.js

const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo');

// GET all todos
router.get('/todos', async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

// routes/todos.js

// POST new todo
router.post('/todos', async (req, res) => {
    try {
      const newTodo = await Todo.create(req.body);
      res.status(201).json(newTodo);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  });
  
  // PUT update todo
  router.put('/todos/:id', async (req, res) => {
    try {
      const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.json(updatedTodo);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  });
  
  // DELETE todo
  router.delete('/todos/:id', async (req, res) => {
    try {
      await Todo.findByIdAndDelete(req.params.id);
      res.status(204).end();
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  });
  