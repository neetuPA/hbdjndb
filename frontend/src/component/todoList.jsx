import { useEffect, useState } from "react";
import {
  getTodos,
  createTodo,
  updateTodoStatus,
  deleteTodo,
  updateTodo,
} from "../api/todoApi";

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [search, setSearch] = useState("");
  const [openTaskId, setOpenTaskId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await getTodos();
      console.log("Fetched todos:", res.data);
      setTodos(res.data);
    } catch (error) {
      console.error("Error fetching todos:", error);
      setError("Unable to fetch todos");
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async () => {
    if (!title.trim()) return;

    try {
      setError("");
      await createTodo({
        title,
        date: new Date().toISOString(),
        status: "pending",
      });

      setTitle("");
      fetchTodos();
    } catch (error) {
      console.error("Error creating task:", error);
      setError("Failed to add task");
    }
  };

  const toggleDetails = (todo) => {
    if (openTaskId === todo._id) {
      setOpenTaskId(null);
    } else {
      setOpenTaskId(todo._id);
      setEditTitle(todo.title);
    }
  };

  const handleUpdateTitle = async (id) => {
    try {
      setError("");
      console.log("Updating task with ID:", id);
      await updateTodo(id, { title: editTitle });
      fetchTodos();
      setOpenTaskId(null);
    } catch (error) {
      console.error("Error updating task:", error);
      setError("Failed to update task");
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      setError("");
      console.log("Updating status for task ID:", id, "to:", status);
      await updateTodoStatus(id, status);
      fetchTodos();
    } catch (error) {
      console.error("Error updating status:", error);
      setError("Failed to update status");
    }
  };

  const handleDelete = async (id) => {
    try {
      setError("");
      console.log("Deleting task with ID:", id);
      await deleteTodo(id);
      fetchTodos();
    } catch (error) {
      console.error("Error deleting task:", error);
      setError("Failed to delete task");
    }
  };

  const filteredTodos = todos.filter((todo) =>
    todo.title.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <p>Loading...</p>;

  return (
    <div className="todo-container">

      <div className="add-box">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="New task"
        />
        <button onClick={handleAdd}>Add</button>
      </div>

      <input
        className="search"
        placeholder="Search task..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {error && <p style={{ color: "red" }}>{error}</p>}

      <ul>
        {filteredTodos.map((todo) => (
          <li key={todo._id} className="todo-item">

            <div onClick={() => toggleDetails(todo)}>
              <span
                className={
                  todo.status === "completed" ? "completed" : ""
                }
              >
                {todo.title}
              </span>
            </div>

            <span
              className="delete-icon"
              onClick={() => handleDelete(todo._id)}
            >
              🗑️
            </span>

            {openTaskId === todo._id && (
              <div className="task-details">

                <p>📅 {new Date(todo.date).toLocaleString()}</p>

                <input
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                />

                <button onClick={() => handleUpdateTitle(todo._id)}>
                  Update Task
                </button>

                <p>📌 Status: {todo.status}</p>

                <select
                  value={todo.status}
                  onChange={(e) =>
                    handleStatusChange(todo._id, e.target.value)
                  }
                >
                  <option value="pending">Pending</option>
                  <option value="completed">Completed</option>
                </select>

              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;