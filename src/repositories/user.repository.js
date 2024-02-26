import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export class UsersRepository {
  constructor(prisma) {
    this.prisma = prisma;
  }

  //회원가입//
  signUp = async (email, hashedPassword, name) => {
    const user = await this.prisma.users.create({
      data: { email, password: hashedPassword, name },
    });

    return user;
  };

  //로그인//

  async signIn(email, password) {
    const result = await this.usersRepository.signIn(email, password);
    return result;
  }
  getUserByEmail = async (email) => {
    const user = await this.prisma.users.findFirst({
      where: { email },
    });
    return user;
  };
}
