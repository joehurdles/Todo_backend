//importing mongoose library to our file
import mongoose from 'mongoose'


const {Schema, model } = mongoose

//creating a variable for our schema
const todoSchema =  Schema({
title : {
    type : String,
    required: true
},
description:{
    type: String,
    required: true
},
date_time:{
    type: String,
    required: true
},
status:{
    type:Boolean,
    required: false,
    default: false
}
})

const todoModel = model('todos', todoSchema)

export default todoModel