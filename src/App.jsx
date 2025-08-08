

// import { useState, useEffect } from "react";
// import "./App.css";
// import axios from "axios";
// import { ToastContainer, toast } from "react-toastify";
// //import {url} from './constains/apiUrl'
// //console.log("API URL:", url);
// const url = import.meta.env.VITE_API_URL


// const App = () => {
  
//   //Changes
//   const [input, setInput] = useState("");
//   const [todoList, setTodoList] = useState([]);
//   const [editId, setEditId] = useState(null);
//   const [editText, setEditText] = useState("");


//   useEffect(() => {
//     fetchTodos();
//   }, []);

//   const fetchTodos = async () => {
//     try {
//       const res = await axios.get(`/api/todos`);
      
//       setTodoList(res.data);
//       // console.log(url)
//     } catch (err) {
//       console.error("Error fetching todos:", err);
//       toast.error("Failed to load todos");
//     }
//   };

//   // Add new todo
//   const addData = async () => {
//     if (!input.trim()) return toast.warn("Please enter a task");

//     try {
//       const res = await axios.post(`/api/todos`, {
//         text: input,
//       });
//       setTodoList([res.data, ...todoList]);
//       setInput("");
//       toast.success("Task added successfully");
//     } catch (err) {
//       console.error("Error adding todo:", err);
//       toast.error("Failed to add task");
//     }
//   };

//   //  Delete todo
//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`/api/todos/${id}`);
//       setTodoList(todoList.filter((todo) => todo._id !== id));
//       toast.error("Task deleted successfully");
//     } catch (err) {
//       console.error("Error deleting todo:", err);
//       toast.error("Failed to delete task");
//     }
//   };

//   //  Toggle completed
//   const handleToggle = async (id, currentStatus, currentText) => {
//     try {
//       const res = await axios.put(`/api/todos/${id}`, {
//         completed: !currentStatus,
//         text: currentText,
//       });

//       const updated = res.data;
//       const updatedTodos = todoList.map((todo) =>
//         todo._id === updated._id ? updated : todo
//       );
//       setTodoList(updatedTodos);
//     } catch (err) {
//       console.error("Error updating todo:", err);
//       toast.error("Failed to update status");
//     }
//   };

//   //  Start edit mode
//   const startEdit = (id, text) => {
//     setEditId(id);
//     setEditText(text);
//   };

//   //  Save edited todo
//   const handleUpdate = async (id) => {
//     if (!editText.trim()) return toast.warn("Task cannot be empty");

//     try {
//       const res = await axios.put(`/api/todos/${id}`, {
//         text: editText,
//       });

//       const updated = res.data;
//       const updatedTodos = todoList.map((todo) =>
//         todo._id === updated._id ? updated : todo
//       );
//       setTodoList(updatedTodos);
//       setEditId(null);
//       setEditText("");
//       toast.success("Task updated successfully");
//     } catch (err) {
//       console.error("Error editing todo:", err);
//       toast.error("Failed to update task");
//     }
//   };

//   return(
//     <div className="container">
//       <ToastContainer position="top-center" autoClose={2000} />
//       <div className="card-container">
//         <div className="todo-head">
//           <h1 className="todo-list-head">Todo list</h1>
//           <img
//             src="https://res.cloudinary.com/dn0v6bhw1/image/upload/v1693318728/kisspng-paper-writing-vector-travel-notes-5a9914e9b83e06.7980698815199818017547_v77gc7.png"
//             className="img"
//             alt="todo-logo"
//           />
//         </div>

//         <div className="card">
//           <input
//             type="text"
//             value={input}
//             onChange={(e) => setInput(e.target.value)}
//             placeholder="You Write anything!"
//             className="input"
//           />
//           <button className="btn" onClick={addData}>
//             Add
//           </button>
//         </div>

//         <div className="details-card">
//           <ol>
//             <div className="card-details">
//               {todoList.map((todo) => (
//                 <li key={todo._id} className="todo-item-container">
//                   <input
//                     type="checkbox"
//                     className="checkbox"
//                     checked={todo.completed}
//                     onChange={() =>
//                       handleToggle(todo._id, todo.completed, todo.text)
//                     }
//                   />

//                   {editId === todo._id ? (
//                     <>
//                       <input
//                         className="input"
//                         value={editText}
//                         onChange={(e) => setEditText(e.target.value)}
//                       />
//                       <span
//                         className="icon icon2"
//                         onClick={() => handleUpdate(todo._id)}
//                       >
//                         <i className="bi bi-check-circle-fill"></i>
//                       </span>
//                     </>
//                   ) : (
//                     <span
//                       className={`todo-text ${
//                         todo.completed ? "line-through" : ""
//                       }`}
//                       style={{ marginLeft: "8px", fontSize: "25px" }}
//                     >
//                       {todo.text}
//                     </span>
//                   )}

//                   <div className="icon-btn">
//                     <span
//                       onClick={() => handleDelete(todo._id)}
//                       className="icon"
//                       style={{ marginLeft: "10px" }}
//                     >
//                       <i className="bi bi-trash-fill icon-del"></i>
//                     </span>

//                     <span
//                       onClick={() => startEdit(todo._id, todo.text)}
//                       className="icon"
//                     >
//                       <i className="bi bi-pencil-fill icon1"></i>
//                     </span>
//                   </div>
//                 </li>
//               ))}
//             </div>
//           </ol>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default App;


import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const API_BASE_URL = import.meta.env.VITE_API_URL;

const App = () => {
  const [input, setInput] = useState("");
  const [todoList, setTodoList] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");

  // useEffect(() => {
  //   fetchTodos();
  // }, []);
   useEffect(() => {
    console.log("API_BASE_URL:", API_BASE_URL); // Debug: Should log your backend URL
    if (!API_BASE_URL) {
      toast.error("API_BASE_URL is undefined. Check your .env file.");
      return;
    }
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/todos`);
      setTodoList(res.data);
    } catch (err) {
      console.error("Error fetching todos:", err);
      toast.error("Failed to load todos");
    }
  };

  const addData = async () => {
    if (!input.trim()) return toast.warn("Please enter a task");

    try {
      const res = await axios.post(`${API_BASE_URL}/api/todos`, {
        text: input,
      });
      setTodoList([res.data, ...todoList]);
      setInput("");
      toast.success("Task added successfully");
    } catch (err) {
      console.error("Error adding todo:", err);
      toast.error("Failed to add task");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/api/todos/${id}`);
      setTodoList(todoList.filter((todo) => todo._id !== id));
      toast.error("Task deleted successfully");
    } catch (err) {
      console.error("Error deleting todo:", err);
      toast.error("Failed to delete task");
    }
  };

  const handleToggle = async (id, currentStatus, currentText) => {
    try {
      const res = await axios.put(`${API_BASE_URL}/api/todos/${id}`, {
        completed: !currentStatus,
        text: currentText,
      });

      const updated = res.data;
      const updatedTodos = todoList.map((todo) =>
        todo._id === updated._id ? updated : todo
      );
      setTodoList(updatedTodos);
    } catch (err) {
      console.error("Error updating todo:", err);
      toast.error("Failed to update status");
    }
  };

  const startEdit = (id, text) => {
    setEditId(id);
    setEditText(text);
  };

  const handleUpdate = async (id) => {
    if (!editText.trim()) return toast.warn("Task cannot be empty");

    try {
      const res = await axios.put(`${API_BASE_URL}/api/todos/${id}`, {
        text: editText,
      });

      const updated = res.data;
      const updatedTodos = todoList.map((todo) =>
        todo._id === updated._id ? updated : todo
      );
      setTodoList(updatedTodos);
      setEditId(null);
      setEditText("");
      toast.success("Task updated successfully");
    } catch (err) {
      console.error("Error editing todo:", err);
      toast.error("Failed to update task");
    }
  };

  return (
    <div className="container">
      <ToastContainer position="top-center" autoClose={2000} />
      <div className="card-container">
        <div className="todo-head">
          <h1 className="todo-list-head">Todo list</h1>
          <img
            src="https://res.cloudinary.com/dn0v6bhw1/image/upload/v1693318728/kisspng-paper-writing-vector-travel-notes-5a9914e9b83e06.7980698815199818017547_v77gc7.png"
            className="img"
            alt="todo-logo"
          />
        </div>

        <div className="card">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="You Write anything!"
            className="input"
          />
          <button className="btn" onClick={addData}>
            Add
          </button>
        </div>

        <div className="details-card">
          <ol>
            <div className="card-details">
              {todoList.map((todo) => (
                <li key={todo._id} className="todo-item-container">
                  <input
                    type="checkbox"
                    className="checkbox"
                    checked={todo.completed}
                    onChange={() =>
                      handleToggle(todo._id, todo.completed, todo.text)
                    }
                  />

                  {editId === todo._id ? (
                    <>
                      <input
                        className="input"
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                      />
                      <span
                        className="icon icon2"
                        onClick={() => handleUpdate(todo._id)}
                      >
                        <i className="bi bi-check-circle-fill"></i>
                      </span>
                    </>
                  ) : (
                    <span
                      className={`todo-text ${
                        todo.completed ? "line-through" : ""
                      }`}
                      style={{ marginLeft: "8px", fontSize: "25px" }}
                    >
                      {todo.text}
                    </span>
                  )}

                  <div className="icon-btn">
                    <span
                      onClick={() => handleDelete(todo._id)}
                      className="icon"
                      style={{ marginLeft: "10px" }}
                    >
                      <i className="bi bi-trash-fill icon-del"></i>
                    </span>

                    <span
                      onClick={() => startEdit(todo._id, todo.text)}
                      className="icon"
                    >
                      <i className="bi bi-pencil-fill icon1"></i>
                    </span>
                  </div>
                </li>
              ))}
            </div>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default App;
