const _ = require('lodash');
const mongoose = require('mongoose');
const __ = require('../helpers/response');
const habitModel = require('../models/habitModel.js');

class todo {
    // Function to get all expenses
    async gethabit(req, res) {
        try {
            let expenseData = await habitModel.find({softdelete : false}).select('title enable created_at').sort({ 'created_at': -1 }).lean();
            let message = 'All Habit listed';
           
            if (_.size(expenseData) > 0) {
                __.success(res, todoData, message);
            } else {
                __.notFound(res, 'No expenses\'s available');
            }
        } catch (error) {
            __.errorInternal(res, error);
        }
    }
    // Function to add Expense
    async habit(req, res) {
        try {
            let temp = {
                title: req.body.title,
                enable: req.body.enable
		softdelete:req.body.softdelete
            }
	if(req.body._id === ""){
            let todo = await habitModel.create(temp);
          }else{
           let getodo = await habitModel.findOneAndUpdate({ _id: req.body._id }, temp );
          }
let message = 'added or updated successfully';
           
                __.success(res, message);
        } catch (error) {
            __.errorInternal(res, error);
        }
    }
}
todo= new todo();
module.exports = todo;