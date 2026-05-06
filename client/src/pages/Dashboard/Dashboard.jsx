import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getEvents } from "../../api/eventApi";
import { getTasks } from "../../api/taskApi";
import Loader from "../../components/ui/Loader";

export default function Dashboard() {
  const navigate = useNavigate();

  const [events, setEvents] = useState([]);
  const [allTasks, setAllTasks] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const eventsData = await getEvents();
        const tasksData = await getTasks();

        setEvents(eventsData.reverse());
        setAllTasks(tasksData || []);
      } catch (err) {
        console.error("Error loading data:", err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const getFilteredEvents = () => {
    return events.filter((event) => {
      const matchesSearch = event.title
        .toLowerCase()
        .includes(search.toLowerCase());

      const eventTasks = allTasks.filter(
        (t) => t.eventId === event._id
      );

      const completed = eventTasks.filter(
        (t) => t.status === "done"
      ).length;

      const progress =
        eventTasks.length === 0
          ? 0
          : Math.round((completed / eventTasks.length) * 100);

      if (filter === "completed") return progress === 100 && matchesSearch;
      if (filter === "upcoming") return progress !== 100 && matchesSearch;

      return matchesSearch;
    });
  };

  // 📊 Stats calculation
  const completedEvents = events.filter((e) => {
    const tasks = allTasks.filter((t) => t.eventId === e._id);
    return tasks.length && tasks.every((t) => t.status === "done");
  }).length;

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white p-6">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Your Events</h1>

        <button
          onClick={() => navigate("/create")}
          className="bg-blue-600 px-5 py-2 rounded-lg hover:bg-blue-700 transition shadow-md hover:shadow-xl"
        >
          + Create Event
        </button>
      </div>

      {/* 📊 Stats */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gray-800 p-4 rounded-xl shadow">
          <p className="text-gray-400">Total Events</p>
          <h2 className="text-2xl font-bold">{events.length}</h2>
        </div>

        <div className="bg-gray-800 p-4 rounded-xl shadow">
          <p className="text-gray-400">Completed</p>
          <h2 className="text-2xl font-bold">{completedEvents}</h2>
        </div>

        <div className="bg-gray-800 p-4 rounded-xl shadow">
          <p className="text-gray-400">Upcoming</p>
          <h2 className="text-2xl font-bold">
            {events.length - completedEvents}
          </h2>
        </div>
      </div>

      {/* Search + Filter */}
      <div className="flex gap-4 mb-6">
        <input
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 bg-gray-800 rounded w-1/3"
        />

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="p-2 bg-gray-800 rounded"
        >
          <option value="all">All</option>
          <option value="upcoming">Upcoming</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      {/* Events */}
      {getFilteredEvents().length === 0 ? (
        <p className="text-gray-400 text-center mt-20">
          No events found
        </p>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {getFilteredEvents().map((event, index) => {
            const eventTasks = allTasks.filter(
              (t) => t.eventId === event._id
            );

            const completed = eventTasks.filter(
              (t) => t.status === "done"
            ).length;

            const progress =
              eventTasks.length === 0
                ? 0
                : Math.round((completed / eventTasks.length) * 100);

            return (
              <motion.div
                key={event._id}
                className="bg-gradient-to-br from-gray-800 to-gray-900 p-5 rounded-2xl shadow-lg hover:shadow-2xl transition cursor-pointer border border-gray-700"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => navigate(`/event/${event._id}`)}
              >
                <h2 className="text-xl font-semibold">{event.title}</h2>

                <p className="text-gray-400 mt-2">📅 {event.date}</p>
                <p className="text-gray-400">💰 ₹{event.budget}</p>

                {/* Progress */}
                <div className="mt-3">
                  <div className="bg-gray-700 h-2 rounded">
                    <div
                      className="bg-green-500 h-2 rounded"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>

                {/* Status */}
                <span
                  className={`inline-block mt-3 px-3 py-1 text-xs rounded-full ${
                    progress === 100
                      ? "bg-green-600"
                      : "bg-yellow-600"
                  }`}
                >
                  {progress === 100 ? "Completed" : "Upcoming"}
                </span>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}