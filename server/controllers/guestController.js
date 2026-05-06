import Guest from "../models/Guest.js";

// ADD GUEST
export const addGuest = async (req, res) => {
  try {
    const guest = await Guest.create(req.body);
    res.status(201).json(guest);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET GUESTS
export const getGuests = async (req, res) => {
  try {
    const guests = await Guest.find({ eventId: req.params.eventId });
    res.json(guests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};