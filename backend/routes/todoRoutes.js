const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoController');

// Get todos for a patient
router.get('/patient/:patientId', todoController.getTodosByPatient);

// Create a new todo
router.post('/', todoController.createTodo);

// Update todo status
router.put('/:id', todoController.updateTodo);

// Delete a todo
router.delete('/:id', todoController.deleteTodo);

module.exports = router;