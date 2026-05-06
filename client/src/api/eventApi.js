const BASE_URL = "http://localhost:5000/api/events";

// GET ALL EVENTS
export const getEvents = async () => {
  const res = await fetch(BASE_URL);
  return res.json();
};

// GET SINGLE EVENT
export const getEventById = async (id) => {
  const res = await fetch(`${BASE_URL}/${id}`);
  return res.json();
};

// CREATE EVENT
export const createEvent = async (event) => {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(event),
  });

  return res.json();
};