export const getAIBudget = async (title) => {
  const res = await fetch("http://localhost:5000/api/ai/budget", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title }),
  });

  return res.json();
};