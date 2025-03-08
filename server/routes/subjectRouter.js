import express from "express";
import userAuth from "../middleware/userAuth.js";
import { getSubjectData } from "../controllers/subjectControllers.js";

const subjectRouter = express();


// get Subjects data
subjectRouter.post("/", userAuth, getSubjectData);

// Update Subjects

export default subjectRouter;
