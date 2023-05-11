const { default: mongoose } = require('mongoose');
const { Task } = require('../models/tasks');
const { wrapAsnc } = require('../middleware/wrapper');
const { CustomeError } = require('../errors/customeError');


const listTasks = wrapAsnc(async(req, res)=> {
    const tasks = await Task.find({});
    res.status(200).json(tasks);
})

const createTask = wrapAsnc(async(req, res)=> {
    const task = await Task.create(req.body);
    res.status(201).json(task);
})

const getTask = wrapAsnc(async(req, res, next)=> {
    const id = req.params.id;
    if(!mongoose.isValidObjectId(id)) {
        return next(new CustomeError('id is not valid', 400));
    }
    const task = await Task.findOne({_id: id});
    if(task === null) {
        return next(new CustomeError('not found task', 404));
    }
    res.status(200).json(task);
})

const updateTask = wrapAsnc(async(req, res, next)=>{
    const id = req.params.id;
    if(!mongoose.isValidObjectId(id)) {
        return next(new CustomeError('id is not valid', 400));
    }
    const task = await Task.findOneAndUpdate({_id: id}, req.body, {
        new: true, runValidators: true
    });
    if(task === null) {
        return next(new CustomeError('not found task', 404));
    }
    res.status(200).json(task);
})

const deleteTask = wrapAsnc(async(req, res)=>{
    const id = req.params.id;
    if(!mongoose.isValidObjectId(id)) {
        return next(new CustomeError('id is not valid', 400));
    }
    const task = await Task.findOneAndDelete({_id: id});
    if(task === null) {
        return next(new CustomeError('not found task', 404));
    }
    res.status(204).json();
})



function getErrorMessage(err) {
    return err.message;
}

module.exports = {
    listTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask
}