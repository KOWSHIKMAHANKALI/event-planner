import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createEvent } from "../../api/eventApi";
import { motion } from "framer-motion";
import { slideUp } from "../../animations/slide";
import { estimateBudget } from "../../utils/budgetEstimator";
import { getAIBudget } from "../../api/aiApi";

export default function CreateEvent() {
  const navigate = useNavigate();

  const [suggestedBudget, setSuggestedBudget] = useState(null);
  const [loadingAI, setLoadingAI] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    date: "",
    budget: "",
    description: "",
  });

  // 🔥 Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    // Rule-based suggestion (instant)
    if (name === "title") {
      const budget = estimateBudget(value);
      setSuggestedBudget(budget);
    }
  };

  // 🔥 AI Budget Call
  const handleAIBudget = async () => {
    if (!formData.title) return;

    try {
      setLoadingAI(true);

      const res = await getAIBudget(formData.title);

      if (res?.budget) {
        setSuggestedBudget(res.budget);
      }
    } catch (err) {
      console.error("AI Error:", err);
    } finally {
      setLoadingAI(false);
    }
  };

  // 🔥 Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    await createEvent(formData);
    navigate("/dashboard");
  };

  return (
    <motion.div
      variants={slideUp}
      initial="hidden"
      animate="visible"
      className="flex justify-center items-center p-6"
    >
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-8 rounded-xl w-full max-w-lg shadow-lg"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">
          Create New Event
        </h2>

        {/* TITLE */}
        <input
          type="text"
          name="title"
          placeholder="Event Title"
          value={formData.title}
          onChange={handleChange}
          className="w-full mb-2 p-3 rounded bg-gray-700"
          required
        />

        {/* 🔥 AI BUTTON */}
        <button
          type="button"
          onClick={handleAIBudget}
          className="mb-3 bg-purple-600 px-3 py-1 rounded hover:bg-purple-700"
        >
          {loadingAI ? "Thinking..." : "🤖 Get AI Budget"}
        </button>

        {/* 🔥 Suggested Budget */}
        {suggestedBudget && (
          <div className="mb-4">
            <p className="text-purple-400 text-sm">
              🤖 Suggested Budget: ₹{suggestedBudget}
            </p>

            <button
              type="button"
              onClick={() =>
                setFormData({ ...formData, budget: suggestedBudget })
              }
              className="mt-1 text-xs bg-green-600 px-2 py-1 rounded hover:bg-green-700"
            >
              Use Suggested
            </button>
          </div>
        )}

        {/* DATE */}
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="w-full mb-4 p-3 rounded bg-gray-700"
          required
        />

        {/* BUDGET */}
        <input
          type="number"
          name="budget"
          placeholder="Budget"
          value={formData.budget}
          onChange={handleChange}
          className="w-full mb-4 p-3 rounded bg-gray-700"
          required
        />

        {/* DESCRIPTION */}
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full mb-4 p-3 rounded bg-gray-700"
        />

        {/* SUBMIT */}
        <button
          type="submit"
          className="w-full bg-blue-600 py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Create Event 🚀
        </button>
      </form>
    </motion.div>
  );
}