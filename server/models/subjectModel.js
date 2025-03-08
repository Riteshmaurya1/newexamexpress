// models/subject.js
import mongoose from "mongoose";

const subjectSchema = new mongoose.Schema({
  branch: {
    type: String,
    required: true,
  },
  semester: {
    type: Number,
    required: true,
  },
  subjectName: {
    type: String,
    required: true,
  },
  unitNumber: {
    type: Number,
    default: 0,
  },
  unitName: {
    type: String,
    default: "",
  },
  unitNotes: {
    type: String,
    default: "",
  },
  unitQuestions: {
    type: String,
    default: "",
  },
  VideoLink: {
    type: String,
    default: "",
  },
});

// Create a model for subjects
const SubjectModel = mongoose.models.Subject || mongoose.model("Subjects", subjectSchema);

export default SubjectModel;