const express = require('express');
const { 
    listTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask
} = require('../controllers/tasks');


const router = express.Router();
router.use(express.json());

router.route('/')
    .get(listTasks)
    .post(createTask);


router.route('/:id')
    .get(getTask)
    .patch(updateTask)
    .delete(deleteTask);


module.exports = router;