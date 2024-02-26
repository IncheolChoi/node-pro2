import express from "express";
import { prisma } from "../models/index.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import loginMiddleware from "../middlewares/need-signin.middleware.js";
import dotenv from "dotenv";
import { authMiddleware } from "../middlewares/auth-middlewares.js";
import { UsersController } from "../src/controllers/user.controller.js";
import { UsersRepository } from "../src/repositories/user.repository.js";
import { UsersService } from "../src/services/user.service.js";

dotenv.config();

const router = express.Router();

const usersRepository = new UsersRepository(prisma);
const usersService = new UsersService(usersRepository);
const usersController = new UsersController(usersService);

// 방법(라우터를 끌어오는 방법)
// signUp 메서드를 직접 호출하여 라우터에서 사용할 수 있음.
// router.post("/sign-up", (req, res) => usersController.signUp(req, res));

// bind()메서드는 객체에 바인딩하여 라우터에서 사용할 수 있도록 할수 있음.
//  ex) router.post("/sign-up", usersController.signUp.bind(usersController));

router.post("/sign-up", usersController.signUp);

router.post("/sign-in", usersController.signIn);

export default router;

// 회원가입 API
// router.post("/sign-up", async (req, res, next) => {
//   try {
//     const { email, password, repassword, name } = req.body;

//     const isExistUser = await prisma.users.findFirst({
//       where: { email },
//     });
//     if (isExistUser)
//       return res.status(409).json({ message: "이미 존재하는 이메일입니다." });
//     if (!(password.length >= 6))
//       return res
//         .status(400)
//         .json({ message: "비밀번호는 6자리 이상을 입력해주세요" });
//     if (password !== repassword)
//       return res.status(400).json({ message: "비밀번호가 일치하지 않습니다" });

//     const hashedPassword = await bcrypt.hash(password, 10);
//     const user = await prisma.users.create({
//       data: { email, password: hashedPassword, name },
//     });

//     const finishUser = await prisma.users.findFirst({
//       where: { email },
//       select: {
//         userId: true,
//         email: true,
//         name: true,
//       },
//     });

//     return res.status(201).json({ data: finishUser });
//   } catch (err) {
//     return res.status(500).json({ message: err });
//   }
// });

// // 로그인 API
// router.post("/sign-in", async (req, res, next) => {
//   const { email, password } = req.body;
//   const tokenStorages = {};

//   const user = await prisma.users.findFirst({
//     where: { email },
//   });
//   if (!user)
//     return res.status(404).json({ message: "존재하지 않는 이메일입니다" });
//   if (!(await bcrypt.compare(password, user.password)))
//     return res.status(401).json({ message: "비밀번호가 일치하지 않습니다." });

//   const accessToken = jwt.sign(
//     { userId: user.userId },
//     process.env.ACCESS_SecretKey,
//     { expiresIn: "12h" }
//   );
//   const refreshToken = jwt.sign(
//     { userId: user.userId },
//     process.env.REFRESH_SecretKey,
//     { expiresIn: "7d" }
//   );

//   await prisma.refreshTokens.create({
//     data: { userId: user.userId, token: refreshToken },
//   });
//   res.cookie("authorization", `Bearer ${accessToken}`);
//   res.cookie("refresh", refreshToken);

//   return res.json({ message: "로그인 성공" });
// });

// // 내 정보 조회 API
// router.get("/user", authMiddleware, loginMiddleware, async (req, res, next) => {
//   const { userId } = req.user;

//   const user = await prisma.users.findFirst({
//     where: { userId: +userId },
//     select: {
//       userId: true,
//       email: true,
//       name: true,
//     },
//   });
//   return res.status(200).json({ data: user });
// });
