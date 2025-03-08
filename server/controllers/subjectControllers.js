import SubjectModel from "../models/subjectModel.js";

export const getSubjectData = async (req, res) => {
  try {
    const { branch, semester } = req.body;
    
    // const { branch, semester, subjectname } = req.body;

    // Query the database (returns an array)

    const branchFronted = branch.toLowerCase();
    const semesterFronted = semester.toLowerCase();
    const subjects = await SubjectModel.find({
      branch: branchFronted,
      semester: semesterFronted,
    });

    // Return ALL matching subjects as an array
    if (subjects.length > 0) {
      return res.status(200).json({
        success: true,
        subjectData: subjects, // Return the entire array
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "No subjects found for the specified criteria.",
        // subjectData: [],
      });
    }
  } catch (error) {
    console.error("Error fetching subject data:", error);
    return res.status(500).json({
      success: false,
      message: "Error fetching subject data",
      subjectData: [], // Fallback empty array
    });
  }
};
