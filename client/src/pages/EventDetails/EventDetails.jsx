import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getEventById } from "../../api/eventApi";
import {
  getTasksByEvent,
  addTask,
  toggleTaskStatus,
} from "../../api/taskApi";
import {
  getGuestsByEvent,
  addGuest,
} from "../../api/guestApi";
import { estimateBudget } from "../../utils/budgetEstimator";
import toast from "react-hot-toast";

export default function EventDetails() {
  const { id } = useParams();

  const [event, setEvent] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [guests, setGuests] = useState([]);

  const [taskInput, setTaskInput] = useState("");
  const [guestInput, setGuestInput] = useState("");

  useEffect(() => {
    const loadData = async () => {
      try {
        const eventData = await getEventById(id);
        const taskData = await getTasksByEvent(id);
        const guestData = await getGuestsByEvent(id);

        setEvent(eventData);
        setTasks(Array.isArray(taskData) ? taskData : []);
        setGuests(Array.isArray(guestData) ? guestData : []);
      } catch {
        toast.error("Failed to load event");
      }
    };

    loadData();
  }, [id]);

  // TASK ADD
  const handleAddTask = async () => {
    if (!taskInput) return;

    const newTask = await addTask({
      eventId: id,
      name: taskInput,
    });

    setTasks([...tasks, newTask]);
    setTaskInput("");
    toast.success("Task added");
  };

  // TOGGLE TASK
  const handleToggle = async (taskId) => {
    await toggleTaskStatus(taskId);
    const updated = await getTasksByEvent(id);
    setTasks(updated);
  };

  // ADD GUEST
  const handleAddGuest = async () => {
    if (!guestInput) return;

    const newGuest = await addGuest({
      eventId: id,
      name: guestInput,
    });

    setGuests([...guests, newGuest]);
    setGuestInput("");
    toast.success("Guest added");
  };

  // PROGRESS
  const completed = tasks.filter((t) => t.status === "done").length;
  const progress =
    tasks.length === 0
      ? 0
      : Math.round((completed / tasks.length) * 100);

  // 🔥 Budget Logic
  const estimated = estimateBudget(event?.title || "");
  const diff = event?.budget - estimated;

  if (!event) return <div className="text-white p-6">Loading...</div>;

  return (
    <div className="text-white p-6">
      <h1 className="text-3xl font-bold mb-2">{event.title}</h1>

      <p className="text-gray-400">📅 {event.date}</p>
      <p className="text-gray-400">💰 ₹{event.budget}</p>

      {/* 🔥 Budget Insight */}
      <div className="mt-2 text-sm">
        <p className="text-blue-400">
          💡 Estimated: ₹{estimated}
        </p>
        <p className={diff >= 0 ? "text-green-400" : "text-red-400"}>
          {diff >= 0
            ? `Under Budget by ₹${diff}`
            : `Over Budget by ₹${Math.abs(diff)}`}
        </p>
      </div>

      {/* PROGRESS */}
      <div className="mt-4">
        <p className="mb-1">Progress: {progress}%</p>
        <div className="bg-gray-700 h-3 rounded">
          <div
            className="bg-green-500 h-3 rounded"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mt-8">

        {/* TASKS */}
        <div>
          <h2 className="text-xl mb-3">Tasks</h2>

          <div className="flex gap-2 mb-4">
            <input
              value={taskInput}
              onChange={(e) => setTaskInput(e.target.value)}
              placeholder="New task"
              className="p-2 bg-gray-800 rounded flex-1"
            />

            <button
              onClick={handleAddTask}
              className="bg-blue-600 px-4 rounded"
            >
              Add
            </button>
          </div>

          {tasks.map((task) => (
            <div
              key={task._id}
              onClick={() => handleToggle(task._id)}
              className={`p-2 mb-2 rounded cursor-pointer ${
                task.status === "done"
                  ? "bg-green-700 line-through"
                  : "bg-gray-700"
              }`}
            >
              {task.name}
            </div>
          ))}
        </div>

        {/* GUESTS */}
        <div>
          <h2 className="text-xl mb-3">Guests</h2>

          <div className="flex gap-2 mb-4">
            <input
              value={guestInput}
              onChange={(e) => setGuestInput(e.target.value)}
              placeholder="Guest name"
              className="p-2 bg-gray-800 rounded flex-1"
            />

            <button
              onClick={handleAddGuest}
              className="bg-blue-600 px-4 rounded"
            >
              Add
            </button>
          </div>

          {guests.map((g) => (
            <div key={g._id} className="p-2 mb-2 bg-gray-700 rounded">
              {g.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}