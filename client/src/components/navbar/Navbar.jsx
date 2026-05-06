import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();

  const linkStyle = (path) =>
    location.pathname === path
      ? "text-blue-500"
      : "text-gray-300 hover:text-white";

  return (
    <div className="w-full bg-gray-900 border-b border-gray-800 px-6 py-4 flex justify-between items-center">
      
      {/* Logo */}
      <Link to="/" className="text-xl font-bold text-white">
        EventPlanner
      </Link>

      {/* Links */}
      <div className="flex gap-6">
        <Link to="/dashboard" className={linkStyle("/dashboard")}>
          Dashboard
        </Link>
        <Link to="/create" className={linkStyle("/create")}>
          Create Event
        </Link>
      </div>
    </div>
  );
}