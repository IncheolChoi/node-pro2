import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
export class UsersService {
  constructor(usersRepository) {
    this.usersRepository = usersRepository;

    // this.signUp = this.signUp.bind(this);
    // this.signIn = this.signIn.bind(this);
  }

  //회원가입//

  signUp = async (email, password, repassword, name) => {
    try {
      const isExistUser = await this.usersRepository.getUserByEmail(email);
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
      const user = await this.usersRepository.signUp(
        email,
        hashedPassword,
        name
      );

      return {
        status: 201,
        data: { data: user },
      };
    } catch (err) {
      throw new Error(err.message);
    }
  };

  // signUp = async (email, password, repassword, name) => {
  //   const result = await this.usersRepository.signUp(
  //     email,
  //     password,
  //     repassword,
  //     name
  //   );
  //   return result;
  // };

  //로그인//

  signIn = async (email, password) => {
    const user = await this.usersRepository.getUserByEmail(email);
    // if (!user) {
    //   return {
    //     status: 404,
    //     data: { message: "존재하지 않는 이메일입니다" },
    //   };
    // }
    // if (!(await bcrypt.compare(password, user.password))) {
    //   return {
    //     status: 401,
    //     data: { message: "비밀번호가 일치하지 않습니다." },
    //   };
    // }
    // console.log(user);
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
    return { accessToken, refreshToken };

    // await this.prisma.refreshTokens.create({
    //   data: { userId: user.userId, token: refreshToken },
    // });
  };
}
// async signIn(email, password) {
//   const result = await this.usersRepository.signIn(email, password);
//   return result;
// }
