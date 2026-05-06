export function estimateBudget(title) {
  const text = title.toLowerCase();

  if (text.includes("wedding")) return 50000;
  if (text.includes("birthday")) return 10000;
  if (text.includes("party")) return 15000;
  if (text.includes("conference")) return 30000;
  if (text.includes("meeting")) return 5000;

  return 8000; // default
}