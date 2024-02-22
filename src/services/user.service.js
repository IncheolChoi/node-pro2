export class UsersService {
  constructor(usersRepository) {
    this.usersRepository = usersRepository;
  }
  //회원가입//
  async signUp(email, password, repassword, name) {
    const result = await this.userRepository.signUp(
      email,
      password,
      repassword,
      name
    );
    return result;
  }
  //로그인//
  async signIn(email, password) {
    const result = await this.userRepository.signIn(email, password);
    return result;
  }
}
