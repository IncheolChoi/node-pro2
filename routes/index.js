import express from 'express';
import ResumesRouter from './documents.router.js';

const router = express.Router();

router.use('/resumes/', ResumesRouter);

export default router;