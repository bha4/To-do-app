const express = require("express");
const mongoose = require("mongoose")
const cors = require("cors")
const app =express();


app.use(express.json())
app.use(cors());
mongoose.connect("mongodb://localhost:27017/Mern-todo")
.then(()=>{
    console.log("mangodb connected");
})
.catch((err)=>{
    console.error(err)
})

const todoSchema = new mongoose.Schema({
    title:{
        required : true,
        type :String
    },
    description:String
})

const todoModel = mongoose.model("Todo",todoSchema)

app.post('/todos',async (request,response)=>{

    const {title, description}=request.body
    try{
    const newTodo = new todoModel ({title,description})
    await newTodo.save();
    response.status(201).json(newTodo);
    }
    catch(error){
        console.log(error)
        response.status(500).json({message: error.message});
    } 
})

app.get("/todos",async (request,response)=>{
    try{
      const todos = await todoModel.find();
      response.json(todos)
    }
    catch(error){
         console.log(error);
         response.status(500).json({ message: error.message });
    }
})

app.put("/todos/:id",async (request,response)=>{
    try{
    const { title, description } = request.body;
    const id = request.params.id;
    const updatedTodo = await todoModel.findByIdAndUpdate(
        id,
        {title, description},
        { new:true }
    )
    if(!updatedTodo){
        return response.status(404).json({message:"Todo not found.."})
    }
    response.json(updatedTodo)
    }
    catch(error){
        console.log(error)
    }
})
 
app.delete("/todos/:id",async (request,response)=>{
    try{
    const id = request.params.id;
    await todoModel.findByIdAndDelete(id);
    response.status(204).end()
    }
    catch(error){
        console.log(error)
         response.status(500).json({ message: error.message });
    }
})


const PORT =8000;
app.listen(PORT,()=>{
    console.log("server listening to the port:"+PORT)
})