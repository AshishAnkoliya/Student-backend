module.exports = function generateChallengeDays(startDate, duration = 30) {
  const start = new Date(startDate);
  const days = [];
  for (let i = 0; i < duration; i++) {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    days.push({
      dayNumber: i + 1,
      date: d,
      status: "Pending",
      notes: "",
      proofUrl: "",
    });
  }
  return days;
};
