import React, { useState } from "react";

const Todo = () => {


  return (
    <>
      <div className="row" p-3 bg-success text-light>
        <h1>TODO PROJECT WITH MERN STACK!..</h1>
      </div>
      <div className="row">
        <h3>Add Item</h3>
        <p className="text-success">Item added sucessfully</p>
      <div>
          <input placeholder="Title" className="form-control" type="text" />
          <input placeholder="Description" className="form-control" type="text" />  
          <button className="btn btn-dark" >Submit</button>
        </div>
      </div>
    </>
  );
};

export default Todo;
