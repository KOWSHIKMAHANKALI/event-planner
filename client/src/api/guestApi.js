const BASE_URL = "https://event-planner-5p5c.onrender.com/api/guests";

// GET GUESTS
export const getGuestsByEvent = async (eventId) => {
  const res = await fetch(`${BASE_URL}/${eventId}`);
  return res.json();
};

// ADD GUEST
export const addGuest = async (guest) => {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(guest),
  });

  return res.json();
};