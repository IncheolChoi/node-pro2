import express from "express";
import ResumesRouter from "./documents.router.js";
import UsersRouter from "./users.router.js";

const router = express.Router();

router.use("/resumes/", ResumesRouter);
router.use("/users/", UsersRouter);

export default router;
