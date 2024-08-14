import React, { useState } from "react";

const Todo = () => {
const [title, setTitle] = useState("");
const [description, setDescription] = useState("");
const [todos, setTodos] = useState([]);
const [error, setError] = useState("");
const [message,setMessage]=useState("");
const apiUrl = "http://localhost:8000";


const submitHandler=()=>{
    if(title.trim() !== "" && description.trim() !== ""){
        fetch(apiUrl+"/todos",{
            method:"POST",
            headers :{
                "content-Type" :'application/json'
            },
            body: JSON.stringify({title,description})
        }).then((response)=>{
            if(response.ok){
              setTodos([...todos, { title, description }]);
              setMessage("Item added sucessfully");
            }else{
                setError("unable to create Todo item")
            }
        })
    }
}
  return (
    <>
      <div className="row p-3 bg-success text-light">
        <h1>TODO PROJECT WITH MERN STACK!..</h1>
      </div>
      <div className="row">
        <h3>Add Item</h3>
        {message&&<p className="text-success">Item added sucessfully</p>}
        <div>
          <input
            placeholder="Title"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            className="form-control"
            type="text"
          />
          <input
            placeholder="Description"
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            className="form-control"
            type="text"
          />
          <button className="btn btn-dark" onClick={submitHandler}>
            Submit
          </button>
        </div>
        {error && <p className="text-danger">{error}</p>}
      </div>
    </>
  );
};

export default Todo;
