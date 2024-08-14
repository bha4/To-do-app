import React, { useEffect, useState } from "react";

const Todo = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [edit, setEdit] = useState(-1);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const apiUrl = "http://localhost:8000";

  const submitHandler = () => {
    setError("");
    if (title.trim() !== "" && description.trim() !== "") {
      fetch(apiUrl + "/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, description }),
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw new Error("Unable to create Todo item!");
        })
        .then((newTodo) => {
          setTodos([...todos, newTodo]);
          setMessage("Item added successfully");
          setTimeout(() => {
            setMessage("");
          }, 3000);
          setTitle("");
          setDescription("");
        })
        .catch((error) => {
          setError(error.message);
        });
    } else {
      setError("Title and description cannot be empty");
    }
  };

  useEffect(() => {
    getItems();
  }, []);

  const getItems = () => {
    fetch(apiUrl + "/todos")
      .then((response) => response.json())
      .then((response) => {
        setTodos(response);
      })
      .catch(() => {
        setError("Failed to fetch items");
      });
  };

  const handleUpdate = () => {
    setError("");
    if (editTitle.trim() !== "" && editDescription.trim() !== "") {
      fetch(apiUrl + "/todos/" + edit, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: editTitle,
          description: editDescription,
        }),
      })
        .then((response) => {
          if (response.ok) {
            const updatedTodos = todos.map((item) => {
              if (item._id === edit) {
                item.title = editTitle;
                item.description = editDescription;
              }
              return item;
            });
            setTodos(updatedTodos);
            setMessage("Item updated successfully!");
            setTimeout(() => {
              setMessage("");
            }, 3000);
            setEdit(-1);
          } else {
            throw new Error("Unable to update Todo item!");
          }
        })
        .catch((error) => {
          setError(error.message);
        });
    } else {
      setError("Title and description cannot be empty");
    }
  };

  const handleDelete = (id) => {
    fetch(apiUrl + "/todos/" + id, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          setTodos(todos.filter((item) => item._id !== id));
          setMessage("Item deleted successfully");
          setTimeout(() => {
            setMessage("");
          }, 3000);
        } else {
          throw new Error("Unable to delete Todo item!");
        }
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  const handleCancel = () => {
    setEdit(-1);
  };

  const handleEdit = (item) => {
    setEdit(item._id);
    setEditTitle(item.title);
    setEditDescription(item.description);
  };

  return (
    <>
      <div className="row p-3 bg-success text-light">
        <h1>TODO PROJECT WITH MERN STACK!..</h1>
      </div>
      <div className="row">
        <h3>Add Item</h3>
        {message && <p className="text-success">{message}</p>}
        <div>
          <input
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="form-control"
            type="text"
          />
          <input
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="form-control"
            type="text"
          />
          <button className="btn btn-dark" onClick={submitHandler}>
            Submit
          </button>
        </div>
        {error && <p className="text-danger">{error}</p>}
      </div>
      <div className="row mt-3">
        <h3>Task</h3>
        <ul className="list-group">
          {todos.map((item) => (
            <li
              key={item._id}
              className="list-group-item d-flex justify-content-between align-items-center my-2"
            >
              <div className="d-flex flex-column">
                {edit === -1 || edit !== item._id ? (
                  <div>
                    <span className="fw-bold">{item.title}</span>
                    <span> {item.description} </span>
                  </div>
                ) : (
                  <div>
                    <input
                      placeholder="Title"
                      onChange={(e) => setEditTitle(e.target.value)}
                      value={editTitle}
                      className="form-control"
                      type="text"
                    />
                    <input
                      placeholder="Description"
                      onChange={(e) => setEditDescription(e.target.value)}
                      value={editDescription}
                      className="form-control"
                      type="text"
                    />
                  </div>
                )}
              </div>
              <div className="d-flex gap-2">
                {edit === -1 || edit !== item._id ? (
                  <>
                    <button
                      className="btn btn-warning"
                      onClick={() => handleEdit(item)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(item._id)}
                    >
                      Delete
                    </button>
                  </>
                ) : (
                  <>
                    <button className="btn btn-warning" onClick={handleUpdate}>
                      Update
                    </button>
                    <button className="btn btn-danger" onClick={handleCancel}>
                      Cancel
                    </button>
                  </>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Todo;
