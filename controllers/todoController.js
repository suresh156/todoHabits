const _ = require('lodash');
const mongoose = require('mongoose');
const __ = require('../helpers/response');
const habitModel = require('../models/habitModel.js');

class todo {
    // Function to get all expenses
    async gethabit(req, res) {
        try {
            let habitData = await habitModel.find({softdelete : false})
            .select('title enable created_at').sort({ 'created_at': -1 }).lean();
            let message = 'All Habit listed';
           
            if (_.size(habitData) > 0) {
                __.success(res, habitData, message);
            } else {
                __.notFound(res, 'No habit\'s available');
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
                enable: req.body.enable,
		        softdelete:req.body.softdelete    
            }
            let todo;
	if(req.body._id === ""){
            todo = await habitModel.create(temp);
          }else{
            todo = await habitModel.findOneAndUpdate({ _id: req.body._id }, temp );
          }
let message = 'added or updated successfully';
           
                __.success(res, todo, message);
        } catch (error) {
            __.errorInternal(res, error);
        }
    }
}
todo= new todo();
module.exports = todo;