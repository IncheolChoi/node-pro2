import express from 'express';
import { prisma } from '../models/index.js';
import jwt from 'jsonwebtoken';
import loginMiddleware from '../middlewares/need-sign-in.middleware.js';
import authMiddleware from '../middlewares/auth-middlewares.js';

const router = express.Router();

// 이력서 생성 API
router.post(
  '/resumes',
  authMiddleware,
  loginMiddleware,
  async (req, res, next) => {
    const { title, comment } = req.body;
    const { userId } = req.user;

    const resume = await prisma.resumes.create({
      data: {
        userId: +userId,
        title,
        comment,
      },
    });
    return res.status(201).json({ data: resume });
  }
);

// 이력서 목록 조회 API
router.get('/resumes', async (req, res, next) => {
  const resume = await prisma.resumes.findMany({
    select: {
      resumeId: true,
      title: true,
      comment: true,
      status: true,
      createdAt: true,
      user: {
        select: {
          name: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return res.status(200).json({ data: resume });
});

// 이력서 상세 조회 API
router.get('/resumes/:resumeId', async (req, res, next) => {
  const { resumeId } = req.params;

  const resume = await prisma.resumes.findFirst({
    where: { resumeId: +resumeId },
    select: {
      resumeId: true,
      title: true,
      comment: true,
      status: true,
      createdAt: true,
      user: {
        select: {
          name: true,
        },
      },
    },
  });

  return res.json({ data: resume });
});

// 이력서 수정 API
router.put(
  '/resumes/:resumeId',
  authMiddleware,
  loginMiddleware,
  async (req, res, next) => {
    try {
      const { resumeId } = req.params;
      const { userId } = req.user;
      const { title, comment, status } = req.body;

      const resume = await prisma.resumes.findFirst({
        where: { resumeId: +resumeId },
      });
      if (!resume)
        return res
          .status(404)
          .json({ message: '이력서 조회에 실패하였습니다.' });

      await prisma.resumes.update({
        data: {
          title,
          comment,
          status,
        },
        where: { resumeId: +resumeId, userId: +userId },
      });

      return res.json({ message: '이력서가 수정됨' });
    } catch (error) {
      if (error.name === 'PrismaClientKnownRequestError')
        return res.status(403).json({ message: '권한이 없습니다' });
    }
  }
);

// 이력서 삭제 API
router.delete(
  '/resumes',
  authMiddleware,
  loginMiddleware,
  async (req, res, next) => {
    try {
      const { userId } = req.user;
      const { resumeId } = req.body;

      const resume = await prisma.resumes.findFirst({
        where: { resumeId: resumeId },
      });
      if (!resume)
        return res
          .status(404)
          .json({ message: '이력서 조회에 실패하였습니다.' });

      await prisma.resumes.delete({
        where: { resumeId: resumeId, userId: +userId },
      });

      return res.json({ message: '이력서가 삭제됨' });
    } catch (error) {
      if (error.name === 'PrismaClientKnownRequestError')
        return res.status(403).json({ message: '권한이 없습니다' });
    }
  }
);

export default router;