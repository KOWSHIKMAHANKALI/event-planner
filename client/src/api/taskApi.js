const BASE_URL = "https://event-planner-5p5c.onrender.com/api/tasks";

// ✅ GET ALL TASKS (for dashboard)
export const getTasks = async () => {
  const res = await fetch(BASE_URL);
  return res.json();
};

// ✅ GET TASKS BY EVENT (for event page)
export const getTasksByEvent = async (eventId) => {
  const res = await fetch(`${BASE_URL}/${eventId}`);
  return res.json();
};

// ✅ ADD TASK
export const addTask = async (task) => {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  });

  return res.json();
};

// ✅ TOGGLE TASK
export const toggleTaskStatus = async (id) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
  });

  return res.json();
};