const express = require('express');
const todoRouter = express.Router();


const todoController = require('../controllers/todoController.js');

// Router function to create or edit or remove todo
todoRouter.post('/', (req, res)=> {
        todoController.habit(req, res);    
});

//Router function to get All Habit
todoRouter.get('/', function (req, res) {
    todoController.gettodo(req, res);
});
module.exports = todoRouter;