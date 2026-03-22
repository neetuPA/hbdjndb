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
    loadTodos();
  }, []);

  const loadTodos = async () => {
    try {
      setLoading(true);
      const { data } = await getTodos();
      setTodos(data);
    } catch {
      setError("Failed to load tasks");
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async () => {
    if (!title.trim()) return;

    try {
      await createTodo({
        title,
        date: new Date(),
        status: "pending",
      });
      setTitle("");
      loadTodos();
    } catch {
      setError("Could not add task");
    }
  };

  const toggleDetails = (todo) => {
    setOpenTaskId(openTaskId === todo._id ? null : todo._id);
    setEditTitle(todo.title);
  };

  const handleUpdateTitle = async (id) => {
    try {
      await updateTodo(id, { title: editTitle });
      setOpenTaskId(null);
      loadTodos();
    } catch {
      setError("Update failed");
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      await updateTodoStatus(id, status);
      loadTodos();
    } catch {
      setError("Status update failed");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTodo(id);
      setTodos((prev) => prev.filter((t) => t._id !== id));
    } catch {
      setError("Delete failed");
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
          placeholder="Add a task..."
        />
        <button onClick={handleAdd}>Add</button>
      </div>


      <input
        className="search"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {error && <p className="error">{error}</p>}

      <ul>
        {filteredTodos.map((todo) => (
          <li key={todo._id} className="todo-item">
            
            <div onClick={() => toggleDetails(todo)}>
              <span className={todo.status === "completed" ? "completed" : ""}>
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
                <p>{new Date(todo.date).toLocaleString()}</p>

                <input
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                />

                <button onClick={() => handleUpdateTitle(todo._id)}>
                  Save
                </button>

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