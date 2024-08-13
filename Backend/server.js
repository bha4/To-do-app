const express = require("express");
const app =express();
app.use(express.json())

let todos=[];

app.post('/todos',(request,response)=>{

    const {title, description}=request.body
    const newTodo ={
        id:todos.length+1,
        title,
        description
    };
    todos.push(newTodo);
    console.log(todos)
    response.status(201).json(newTodo)
 
})


const PORT =3000;
app.listen(PORT,()=>{
    console.log("server listening to the port:"+PORT)
})