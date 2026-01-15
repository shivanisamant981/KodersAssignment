import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/tasks");
      setTasks(res.data);
    } catch (err) {
      console.log("Get error", err.message);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleTasks = async () => {
    try {
      await axios.post("http://localhost:5000/api/tasks", {
        title,
        description,
      });
      setTitle("");
      setDescription("");
      fetchTasks();
    } catch (err) {
      console.log("Post error", err.message);
      alert("failed to add task");
    }
  };
  const handleToggleStatus = async (id) => {
    try {
      await axios.patch(`http://localhost:5000/api/tasks/${id}/toggle`);
      fetchTasks();
    } catch (err) {
      console.log("Toggle error", err.message);
      alert("Failed to toggle status");
    }
  };

  return (
    <>
      <div className="text-4xl text-center">Task Manager</div>
      <div className="flex flex-col items-center justify-center gap-4 mt-3 pt-3 bg-center">
        <div>
          <input
            className="w-200 text-center border border-gray-400 p-2 rounded mb-4 "
            value={title}
            type="text"
            placeholder="enter the title"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div>
          <input
            className="w-200 text-center border border-gray-400 p-2 rounded mb-4 "
            value={description}
            type="text"
            placeholder="enter the description"
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <button
            className="w-200 max-w-md md:max-w-xl lg:max-w-3xl bg-sky-600 text-white py-2 rounded-full mb-6 hover:bg-sky-700 transition"
            onClick={handleTasks}
          >
            Add todo
          </button>{" "}
          <br />
        </div>
      </div>

      <div className="w-full flex flex-col items-center gap-4 mt-6">
        {tasks.length === 0 ? (
          <p className="text-gray-500">No tasks found</p>
        ) : (
          tasks.map((task) => (
            <div
              key={task._id}
              className="w-full max-w-xl border border-gray-300 rounded-lg p-4 flex justify-between items-center"
            >
              <div>
                <h2 className="text-lg font-bold">{task.title}</h2>
                <p className="text-gray-600">{task.description}</p>
              </div>
              <button
                onClick={() => handleToggleStatus(task._id)}
                className={`px-4 py-2 rounded-full text-white font-semibold ${
                  task.status === "Pending" ? "bg-red-500" : "bg-green-600"
                }`}
              >
                {task.status}
              </button>
            </div>
          ))
        )}
      </div>
    </>
  );
}

export default App;
