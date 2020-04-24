const express = require('express');
const todoController = require('../controllers/todo');

const router = express.Router();

router.get('/todo/:id', todoController.getTodo);

router.post('/todo', todoController.addTodo);

router.put('/todo/:id', todoController.editTodo);

router.delete('/todo/:id', todoController.deleteTodo);

module.exports = router;