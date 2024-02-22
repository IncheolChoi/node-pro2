export class UsersController {
  constructor(usersService) {
    this.usersService = usersService;
  }

  //회원가입//
  async signUp(req, res) {
    try {
      const { email, password, repassword, name } = req.body;
      const result = await this.usersService.signUp(
        email,
        password,
        repassword,
        name
      );
      res.status(result.status).json(result.data);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
  //로그인//
  async signIn(req, res) {
    try {
      const { email, password } = req.body;
      const result = await this.userService.signIn(email, password);
      res.status(result.status).json(result.data);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
}
