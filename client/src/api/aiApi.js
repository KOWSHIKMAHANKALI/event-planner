export const getAIBudget = async (title) => {
  const res = await fetch("https://event-planner-5p5c.onrender.com/api/ai/budget", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title }),
  });

  return res.json();
};