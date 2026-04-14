const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const appointmentRoutes = require("./routes/appointmentRoutes");
const feedbackRoutes = require("./routes/feedback.routes");
const taskRoutes = require("./routes/taskRoutes");
const authRoutes = require("./routes/authRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const noteRoutes = require("./routes/noteRoutes");
const surveyRoutes = require("./routes/surveyRoutes");
const goalRoutes = require("./routes/goalRoutes");
const resourceRoutes = require("./routes/resourceRoutes");
const attendanceRoutes = require("./routes/attendanceRoutes");
const examRoutes = require("./routes/exams");
const habitRoutes = require("./routes/habitRoutes");
const flashcardRoutes = require("./routes/flashcards");
const assignmentRoutes = require("./routes/assignmentRoutes");
const suggestionRoutes =require("./routes/suggestionRoutes");
const progressRoutes = require("./routes/progressRoutes");
const skillRoutes = require("./routes/skillRoutes");
const journalRoutes = require("./routes/journalRoutes");  
const discussionRoutes = require("./routes/discussionRoutes");
const syllabusRoutes = require("./routes/syllabusRoutes");
const careerRoutes = require("./routes/careerRoutes");
const announcementRoutes = require("./routes/announcementRoutes");
const birthdayRoutes = require("./routes/birthdayRoutes");
const usefulLinksRoutes = require("./routes/usefulLinks");
const groupProjectRoutes = require("./routes/groupProjectRoutes");
const studyPlaylistRoutes = require("./routes/studyPlaylistRoutes");
const challengeRoutes = require("./routes/challengeRoutes");

// const path = require("path");

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// app.use(express.static(path.join(__dirname, "client/build"))); // adjust if needed

// app.get("*", (req, res) =>
//   res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
// );

app.use("/api/appointments", appointmentRoutes);
app.use("/api/feedbacks", feedbackRoutes);
app.use("/api/tasks", taskRoutes); 
app.use("/api/auth", authRoutes);
app.use("/api/dashboard-summary", dashboardRoutes);
app.use("/api/notes", noteRoutes);
app.use("/api/surveys", surveyRoutes);
app.use("/api/goals", goalRoutes);
app.use("/api/resources", resourceRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/exams", examRoutes);
app.use("/api/habits", habitRoutes);
app.use("/api/flashcards", flashcardRoutes);
app.use("/api/assignments", assignmentRoutes);
app.use("/api/suggestions", suggestionRoutes);
app.use("/api/progress", progressRoutes);
app.use("/api/skills", skillRoutes);
app.use("/api/journals", journalRoutes);
app.use("/api/discussions", discussionRoutes);
app.use("/api/syllabus", syllabusRoutes);
app.use("/api/careers", careerRoutes);
app.use("/api/announcements", announcementRoutes);
app.use("/api/birthdays", birthdayRoutes);
app.use("/api/links", usefulLinksRoutes);
app.use("/api/group-projects", groupProjectRoutes);
app.use("/api/study-playlist", studyPlaylistRoutes);
app.use("/api/challenges", challengeRoutes);

// ✅ Keep this
app.get("/", (req, res) => res.send("Task Tracker API Running"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 
