const mongoose = require('mongoose')

const Schema = mongoose.Schema

const todoSchema = new Schema ({
    Name: {
        type: String,
        required: true
    },
    Completed: {
        type: Boolean,
        default: false
    }
}, {timestamps: true})

module.exports = mongoose.model('Todo', todoSchema)