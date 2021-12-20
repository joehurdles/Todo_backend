import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import TodoModel from './schema/todo_schema.js';

//configuring dotenv to use environment variables stored in .env file
dotenv.config();

//creating an instance of express server
const app = express();

//using the cors middleware to grt the body of our request in json format
app.use(cors());
app.use(express.json());

//assigning port number to server
const port = process.env.PORT || 5000;

//assigning database url to variable
const db = process.env.DB_URL;

//creating a new todo
app.post('/todo', async (req, res)=>{
    const {title,description, date_time} = req.body;
    console.log('New todo created',{title,description,date_time});
    const todoModel = await TodoModel.create({
        title,
        description,
        date_time,
        })
        if(todoModel){
            return res.status(201).json({
                status:true,
                message:"Todo created successfully",
                data:todoModel
            })
            
        } else{
            return res.status(400).json({
                status: false,
                message:"Todo was not created",
            })
}
})
// getting all todos
app.get('/todo', async (req, res)=>{
    const {status} = req.params
    console.log('New todo created',status);
    const todoModel = await TodoModel.find({});
    if(todoModel){
        return res.status(201).json({
            status:true,
            message:"Todo fetch successfully",
            data:todoModel
        })
        
    } else{
        return res.status(400).json({
            status: false,
            message:"Todos were not fetched",
        })
}
});
//connecting to MongoDB database
mongoose.connect(db, {
    useNewURLParser: true,
    useUnifiedTopology: true
}).then(()=>{
    console.log('connected to db');
}).catch((error)=>{console.log(error);})

//listening to our port
app.listen(port,()=>{console.log('server is up and running')});
