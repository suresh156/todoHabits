const mongoose = require('mongoose');

const habitSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    enable: {
        type: boolean ,
        required: true,
	default : true
    },
    softdelete: {
        type: boolean,
        required: true,
	default : false
    },
   }, {
        timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
    });

module.exports = mongoose.model('habit', habitSchema);