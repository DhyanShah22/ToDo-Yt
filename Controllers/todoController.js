const { default: mongoose } = require('mongoose')

const ToDo = require('../Models/todoSchema')

const getTodo = async (req,res) => {
    const todo = await ToDo.find({}).sort({createdAt: -1})

    res.status(200).json(todo)
}

const getSingleTodo = async (req,res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({error: 'Not a valid DB id.'})
    }

    const todo = await ToDo.findById(id)

    if(!todo) {
        return res.status(404).json({error: 'Unable to find the task.'})
    }

    res.status(200).json(todo)
}

const addTodo = async (req,res) => {
    const {Name , Completed} = req.body

    try{
        const todo = await ToDo.create({Name, Completed})
        res.status(200).json(todo)
    }
    catch(error){
        return res.status(400).json({error: 'Unable to create a task.'})
    }
}

const updateTodo = async (req,res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({error: 'Not a valid DB id.'})
    }

    const todo = await ToDo.findOneAndUpdate({_id : id}, req.body, {
        new: true,
        runValidators: true
    })

    if(!todo) {
        return res.status(404).json({error: 'Unable to find the task.'})
    }

    res.status(200).json(todo)
}

const deleteTodo = async (req,res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({error: 'Not a valid DB id.'})
    }

    const todo = await ToDo.findOneAndDelete({_id: id})

    if(!todo) {
        return res.status(404).json({error: 'Unable to find the task.'})
    }

    res.status(200).json(todo)
}

module.exports = {
    getSingleTodo,
    getTodo,
    addTodo,
    updateTodo,
    deleteTodo
}