export class UsersService {
  constructor(usersRepository) {
    this.usersRepository = usersRepository;

    // this.signUp = this.signUp.bind(this);
    // this.signIn = this.signIn.bind(this);
  }

  //회원가입//
  async signUp(email, password, repassword, name) {
    const result = await this.usersRepository.signUp(
      email,
      password,
      repassword,
      name
    );
    return result;
  }

  //로그인//
  async signIn(email, password) {
    const result = await this.usersRepository.signIn(email, password);
    return result;
  }
}
