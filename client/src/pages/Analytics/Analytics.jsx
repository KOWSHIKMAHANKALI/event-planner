import { useEffect, useState } from "react";
import { getEvents } from "../../api/eventApi";
import { getTasks } from "../../api/taskApi";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function Analytics() {
  const [events, setEvents] = useState([]);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const eventsData = await getEvents();
      const tasksData = await getTasks();

      setEvents(eventsData || []);
      setTasks(tasksData || []);
    };

    loadData();
  }, []);

  // 📊 TASK COMPLETION DATA
  const completed = tasks.filter((t) => t.status === "done").length;
  const pending = tasks.length - completed;

  const pieData = [
    { name: "Completed", value: completed },
    { name: "Pending", value: pending },
  ];

  const COLORS = ["#22c55e", "#ef4444"];

  // 💰 BUDGET DATA
  const budgetData = events.map((event) => ({
    name: event.title,
    budget: event.budget,
    spent: (event.budget * 0.6).toFixed(0), // dummy logic
  }));

  return (
    <div className="min-h-screen text-white p-6 bg-gradient-to-br from-gray-900 to-black">

      <h1 className="text-3xl font-bold mb-8">📊 Analytics Dashboard</h1>

      <div className="grid md:grid-cols-2 gap-8">

        {/* 🔥 PIE CHART */}
        <div className="bg-gray-900 p-6 rounded-2xl border border-gray-800">
          <h2 className="mb-4 text-lg">Task Completion</h2>

          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* 🔥 BAR CHART */}
        <div className="bg-gray-900 p-6 rounded-2xl border border-gray-800">
          <h2 className="mb-4 text-lg">Budget Overview</h2>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={budgetData}>
              <XAxis dataKey="name" stroke="#ccc" />
              <YAxis stroke="#ccc" />
              <Tooltip />
              <Bar dataKey="budget" fill="#3b82f6" />
              <Bar dataKey="spent" fill="#f59e0b" />
            </BarChart>
          </ResponsiveContainer>
        </div>

      </div>
    </div>
  );
}