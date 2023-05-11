const { Schema, model } = require('mongoose');

const TaskSchema = new Schema({
    content: {
        type: String,
        required: true,
        maxLength: 200,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false,
    }
})

const Task = model('Task', TaskSchema);

module.exports = {
    Task
}