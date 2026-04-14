const Survey = require("../models/Survey");

// Create a new survey
const createSurvey = async (req, res) => {
  try {
    const { title, questions } = req.body;
    const survey = await Survey.create({ title, questions });
    res.status(201).json(survey);
  } catch (err) {
    res.status(500).json({ message: "Failed to create survey", error: err.message });
  }
};

// Get all surveys

// const getSurveys = async (req, res) => {
//   try {
//     const surveys = await Survey.find().sort({ createdAt: -1 });
//     res.status(200).json(surveys);
//   } catch (err) {
//     res.status(500).json({ message: "Failed to fetch surveys", error: err.message });
//   }
// };

const getSurveys = async (req, res) => {
  try {
    const surveys = await Survey.find().sort({ createdAt: -1 });

    const processed = surveys.map((survey) => {
      const questionsWithStats = survey.questions.map((q) => {
        const counts = {};
        q.options.forEach((option) => {
          counts[option] = q.responses.filter((res) => res === option).length;
        });

        return {
          questionText: q.questionText,
          options: q.options,
          stats: counts,
        };
      });

      return {
        _id: survey._id,
        title: survey.title,
        questions: questionsWithStats,
      };
    });

    res.status(200).json(processed);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch surveys", error: err.message });
  }
};

// Submit answers to a survey

// const submitAnswers = async (req, res) => {
//   try {
//     const { answers } = req.body; // { questionIndex: selectedOption }

//     const survey = await Survey.findById(req.params.id);
//     if (!survey) return res.status(404).json({ message: "Survey not found" });

//     survey.questions.forEach((q, idx) => {
//       if (answers[idx]) {
//         q.responses.push(answers[idx]);
//       }
//     });

//     await survey.save();
//     res.status(200).json({ message: "Responses submitted successfully" });
//   } catch (err) {
//     res.status(500).json({ message: "Failed to submit responses", error: err.message });
//   }
// };

const submitAnswers = async (req, res) => {
  try {
    const { answers } = req.body; // answers = { 0: ["Option A", "Option B"], 1: ["Option D"] }

    const survey = await Survey.findById(req.params.id);
    if (!survey) return res.status(404).json({ message: "Survey not found" });

    survey.questions.forEach((q, idx) => {
      if (answers[idx]) {
        const selected = Array.isArray(answers[idx]) ? answers[idx] : [answers[idx]];
        selected.forEach((option) => {
          if (q.options.includes(option)) {
            q.responses.push(option);
          }
        });
      }
    });

    await survey.save();
    res.status(200).json({ message: "Responses submitted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to submit responses", error: err.message });
  }
};


// Delete a survey
const deleteSurvey = async (req, res) => {
  try {
    const survey = await Survey.findByIdAndDelete(req.params.id);
    if (!survey) return res.status(404).json({ message: "Survey not found" });
    res.status(200).json({ message: "Survey deleted" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete survey", error: err.message });
  }
};

module.exports = {
  createSurvey,
  getSurveys,
  submitAnswers,
  deleteSurvey,
};
