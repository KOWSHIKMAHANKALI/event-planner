import { Routes, Route } from "react-router-dom";

import CalendarPage from "./pages/Calendar/CalendarPage";
import Landing from "./pages/Landing/Landing";
import Dashboard from "./pages/Dashboard/Dashboard";
import CreateEvent from "./pages/CreateEvent/CreateEvent";
import EventDetails from "./pages/EventDetails/EventDetails";
import NotFound from "./pages/NotFound/NotFound";
import MainLayout from "./components/layout/MainLayout";
import Analytics from "./pages/Analytics/Analytics";

function App() {
  return (
    <Routes>

      <Route path="/" element={<Landing />} />

      <Route
        path="/dashboard"
        element={
          <MainLayout>
            <Dashboard />
          </MainLayout>
        }
      />

      <Route
        path="/create"
        element={
          <MainLayout>
            <CreateEvent />
          </MainLayout>
        }
      />

      <Route
        path="/event/:id"
        element={
          <MainLayout>
            <EventDetails />
          </MainLayout>
        }
      />

      <Route
        path="/calendar"
        element={
          <MainLayout>
            <CalendarPage />
          </MainLayout>
        }
      />

      <Route
        path="/analytics"
        element={
          <MainLayout>
            <Analytics />
          </MainLayout>
        }
      />

      <Route path="*" element={<NotFound />} />

    </Routes>
  );
}

export default App;