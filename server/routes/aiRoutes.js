import express from "express";
import { getBudgetEstimate } from "../controllers/aiController.js";

const router = express.Router();

router.post("/budget", getBudgetEstimate);

export default router;