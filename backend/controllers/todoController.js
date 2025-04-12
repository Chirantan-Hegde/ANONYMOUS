const Todo = require('../models/Todo');
const Patient = require('../models/Patient');

// Get todos for a specific patient
exports.getTodosByPatient = async (req, res) => {
  try {
    const todos = await Todo.find({ patientId: req.params.patientId });
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new todo
exports.createTodo = async (req, res) => {
  try {
    const { patientId, task } = req.body;
    
    const patient = await Patient.findById(patientId);
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    
    const todo = new Todo({
      patientId,
      task
    });
    
    await todo.save();
    res.status(201).json(todo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update todo status
exports.updateTodo = async (req, res) => {
  try {
    const { completed } = req.body;
    
    const todo = await Todo.findByIdAndUpdate(
      req.params.id,
      { completed },
      { new: true }
    );
    
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    
    res.json(todo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a todo
exports.deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);
    
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    
    res.json({ message: 'Todo deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};