import express from "express";
import {
  addGuest,
  getGuests,
} from "../controllers/guestController.js";

const router = express.Router();

router.post("/", addGuest);
router.get("/:eventId", getGuests);

export default router;