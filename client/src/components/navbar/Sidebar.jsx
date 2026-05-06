import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, PlusCircle, CalendarDays } from "lucide-react";
import { BarChart3 } from "lucide-react";
export default function Sidebar() {
  const location = useLocation();

  const linkClass = (path) =>
    `flex items-center gap-3 px-4 py-3 rounded-lg transition ${
      location.pathname === path
        ? "bg-blue-600"
        : "hover:bg-gray-800 text-gray-300"
    }`;

  return (
    <div className="w-64 bg-gray-950 border-r border-gray-800 p-4 flex flex-col">
      
      {/* Logo */}
      <h1 className="text-2xl font-bold mb-10">EventPro</h1>

      {/* Links */}
      <nav className="flex flex-col gap-2">
        <Link to="/dashboard" className={linkClass("/dashboard")}>
          <LayoutDashboard size={18} />
          Dashboard
        </Link>

        <Link to="/create" className={linkClass("/create")}>
          <PlusCircle size={18} />
          Create Event
        </Link>

        <Link to="/calendar" className={linkClass("/calendar")}>
          <CalendarDays size={18} />
          Calendar
        </Link>

        <Link to="/analytics" className={linkClass("/analytics")}>
          <BarChart3 size={18} />
          Analytics
        </Link>

      </nav>

      {/* Bottom */}
      <div className="mt-auto text-gray-500 text-sm">
        Built with ❤️
      </div>
    </div>
  );
}