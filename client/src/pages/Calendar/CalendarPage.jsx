import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../../styles/calendar.css";
import { getEvents } from "../../api/eventApi";
import { motion } from "framer-motion";

export default function CalendarPage() {
  const [date, setDate] = useState(new Date());
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const data = await getEvents();
        setEvents(data || []);
      } catch (err) {
        console.error(err);
      }
    };

    loadEvents();
  }, []);

  // Filter events for selected date
  const selectedEvents = events.filter(
    (e) =>
      new Date(e.date).toDateString() ===
      date.toDateString()
  );

  return (
    <div className="min-h-screen text-white p-6 bg-gradient-to-br from-gray-900 to-black">

      <h1 className="text-3xl font-bold mb-6">📅 Event Calendar</h1>

      {/* Calendar Card */}
      <motion.div
        className="bg-gray-900 p-6 rounded-2xl shadow-lg border border-gray-800"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Calendar
          onChange={setDate}
          value={date}

          // 🔥 Event indicators
          tileContent={({ date }) => {
            const count = events.filter(
              (e) =>
                new Date(e.date).toDateString() ===
                date.toDateString()
            ).length;

            return count > 0 ? (
              <div className="flex justify-center mt-1">
                <div className="text-xs text-blue-400">
                  {count}
                </div>
              </div>
            ) : null;
          }}
        />
      </motion.div>

      {/* Selected Date Events */}
      <div className="mt-8">
        <h2 className="text-xl mb-4">
          Events on {date.toDateString()}
        </h2>

        {selectedEvents.length === 0 ? (
          <div className="text-gray-400 text-center mt-6">
            <p className="text-lg">No events 📭</p>
            <p className="text-sm">Try selecting another date</p>
          </div>
        ) : (
          selectedEvents.map((event) => (
            <div
              key={event._id}
              className="bg-gray-800 p-4 rounded-lg mb-3 hover:bg-gray-700 transition"
            >
              <h3 className="font-semibold">{event.title}</h3>
              <p className="text-gray-400 text-sm">
                💰 ₹{event.budget}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}