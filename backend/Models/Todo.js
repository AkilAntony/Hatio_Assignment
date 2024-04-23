import { request } from "express";
import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
    todo:{
        type:String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'completed'],
        required: true
    },
    createdDate: {
        type: Date,
        default: Date.now,
        required: true
    },
    updatedDate: {
        type: Date,
        default: Date.now,
        required: true
    },
     owner: {
      type: mongoose.Schema.Types.ObjectId, // Reference to the User schema
      ref: "Project",
      required: true,
    },
});

const Todo = mongoose.model('Todo', todoSchema);
 
export default Todo
 