import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export class UsersRepository {
  constructor(prisma) {
    this.prisma = prisma;
  }

  //회원가입//
  signUp = async (email, password, repassword, name) => {
    try {
      const isExistUser = await this.prisma.users.findFirst({
        where: { email },
      });

      if (isExistUser) {
        return {
          status: 409,
          data: { message: "이미 존재하는 이메일입니다." },
        };
      }
      if (!(password.length >= 6)) {
        return {
          status: 400,
          data: { message: "비밀번호는 6자리 이상을 입력해주세요" },
        };
      }
      if (password !== repassword) {
        return {
          status: 400,
          data: { message: "비밀번호가 일치하지 않습니다" },
        };
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await this.prisma.users.create({
        data: { email, password: hashedPassword, name },
      });

      const finishUser = await this.prisma.users.findFirst({
        where: { email },
        select: {
          userId: true,
          email: true,
          name: true,
        },
      });

      return {
        status: 201,
        data: { data: finishUser },
      };
    } catch (err) {
      throw new Error(err.message);
    }
  };

  //로그인//
  signIn = async (email, password) => {
    try {
      const user = await this.prisma.users.findFirst({
        where: { email },
      });

      if (!user) {
        return {
          status: 404,
          data: { message: "존재하지 않는 이메일입니다" },
        };
      }
      if (!(await bcrypt.compare(password, user.password))) {
        return {
          status: 401,
          data: { message: "비밀번호가 일치하지 않습니다." },
        };
      }

      const accessToken = jwt.sign(
        { userId: user.userId },
        process.env.ACCESS_SecretKey,
        { expiresIn: "12h" }
      );
      const refreshToken = jwt.sign(
        { userId: user.userId },
        process.env.REFRESH_SecretKey,
        { expiresIn: "7d" }
      );

      await this.prisma.refreshTokens.create({
        data: { userId: user.userId, token: refreshToken },
      });

      return {
        status: 200,
        data: { message: "로그인 성공" },
      };
    } catch (err) {
      throw new Error(err.message);
    }
  };
}
