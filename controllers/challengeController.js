const Challenge = require("../models/Challenge");
const generateChallengeDays = require("../utils/generateDaysArray");

// Helper: derive progress stats
const buildProgress = (challengeDoc) => {
  const days = challengeDoc.days || [];
  const total = days.length || challengeDoc.durationDays || 30;
  const doneCount = days.filter((d) => d.status === "Done").length;
  const percent = total > 0 ? Math.round((doneCount / total) * 100) : 0;

  // streaks (current + longest)
  let currentStreak = 0;
  let longestStreak = 0;
  for (const day of days) {
    if (day.status === "Done") {
      currentStreak += 1;
      longestStreak = Math.max(longestStreak, currentStreak);
    } else {
      currentStreak = 0;
    }
  }

  return { doneCount, total, percent, longestStreak, currentStreak };
};

// POST /api/challenges
exports.createChallenge = async (req, res) => {
  try {
    const { title, startDate, durationDays = 30 } = req.body;

    if (!title || !startDate) {
      return res.status(400).json({ error: "title and startDate are required" });
    }

    const days = generateChallengeDays(startDate, durationDays);

    const challenge = await Challenge.create({
      title,
      startDate,
      durationDays,
      days,
    });

    const progress = buildProgress(challenge);
    res.status(201).json({ ...challenge.toObject(), progress });
  } catch (err) {
    console.error("createChallenge error:", err);
    res.status(500).json({ error: "Failed to create challenge" });
  }
};

// GET /api/challenges
exports.getChallenges = async (req, res) => {
  try {
    const challenges = await Challenge.find().sort({ createdAt: -1 });
    const withProgress = challenges.map((ch) => ({
      ...ch.toObject(),
      progress: buildProgress(ch),
    }));
    res.json(withProgress);
  } catch (err) {
    console.error("getChallenges error:", err);
    res.status(500).json({ error: "Failed to fetch challenges" });
  }
};

// GET /api/challenges/:id
exports.getChallengeById = async (req, res) => {
  try {
    const ch = await Challenge.findById(req.params.id);
    if (!ch) return res.status(404).json({ error: "Challenge not found" });
    res.json({ ...ch.toObject(), progress: buildProgress(ch) });
  } catch (err) {
    console.error("getChallengeById error:", err);
    res.status(500).json({ error: "Failed to fetch challenge" });
  }
};

// PATCH /api/challenges/:id/days/:dayNumber
exports.updateChallengeDay = async (req, res) => {
  try {
    const { status, notes, proofUrl } = req.body;
    const { id, dayNumber } = req.params;

    const ch = await Challenge.findById(id);
    if (!ch) return res.status(404).json({ error: "Challenge not found" });

    const dayIdx = ch.days.findIndex(
      (d) => d.dayNumber === Number(dayNumber)
    );
    if (dayIdx === -1)
      return res.status(404).json({ error: "Day not found in challenge" });

    if (status) ch.days[dayIdx].status = status;
    if (notes !== undefined) ch.days[dayIdx].notes = notes;
    if (proofUrl !== undefined) ch.days[dayIdx].proofUrl = proofUrl;

    await ch.save();
    res.json({ ...ch.toObject(), progress: buildProgress(ch) });
  } catch (err) {
    console.error("updateChallengeDay error:", err);
    res.status(500).json({ error: "Failed to update challenge day" });
  }
};

// // PUT /api/challenges/:id  (update challenge title or regenerate dates)
// exports.updateChallenge = async (req, res) => {
//   try {
//     const { title, startDate, durationDays } = req.body;
//     const ch = await Challenge.findById(req.params.id);
//     if (!ch) return res.status(404).json({ error: "Challenge not found" });

//     if (title !== undefined) ch.title = title;

//     // Regenerate days if startDate or duration changes
//     if (startDate || durationDays) {
//       const newStart = startDate || ch.startDate;
//       const newDuration = durationDays || ch.durationDays;
//       ch.startDate = newStart;
//       ch.durationDays = newDuration;
//       ch.days = generateChallengeDays(newStart, newDuration);
//     }

//     await ch.save();
//     res.json({ ...ch.toObject(), progress: buildProgress(ch) });
//   } catch (err) {
//     console.error("updateChallenge error:", err);
//     res.status(500).json({ error: "Failed to update challenge" });
//   }
// };

exports.updateChallenge = async (req, res) => {
  try {
    const { title, startDate, durationDays, days } = req.body;

    const ch = await Challenge.findById(req.params.id);
    if (!ch) return res.status(404).json({ error: "Challenge not found" });

    if (title !== undefined) ch.title = title;
    if (startDate !== undefined) ch.startDate = startDate;
    if (durationDays !== undefined) ch.durationDays = durationDays;

    // ✅ Use provided days if sent in the body
    if (Array.isArray(days) && days.length > 0) {
      ch.days = days;
    } else if (startDate || durationDays) {
      // ✅ Only regenerate days if user updated startDate/duration and didn't send custom days
      const newStart = startDate || ch.startDate;
      const newDuration = durationDays || ch.durationDays;
      ch.days = generateChallengeDays(newStart, newDuration);
    }

    await ch.save();
    res.json({ ...ch.toObject(), progress: buildProgress(ch) });
  } catch (err) {
    console.error("updateChallenge error:", err);
    res.status(500).json({ error: "Failed to update challenge" });
  }
};


// DELETE /api/challenges/:id
exports.deleteChallenge = async (req, res) => {
  try {
    await Challenge.findByIdAndDelete(req.params.id);
    res.json({ message: "Challenge deleted" });
  } catch (err) {
    console.error("deleteChallenge error:", err);
    res.status(500).json({ error: "Failed to delete challenge" });
  }
};
