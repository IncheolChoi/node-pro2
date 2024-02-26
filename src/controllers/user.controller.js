export class UsersController {
  constructor(usersService) {
    this.usersService = usersService;
    // 메서드를 여기에 바인딩하십시오.
    // this.signUp = this.signUp.bind(this);
    // this.signIn = this.signIn.bind(this);
  }

  //회원가입//
  signUp = async (req, res, next) => {
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
  };

  //로그인//

  signIn = async (req, res, next) => {
    const { email, password } = req.body;
    const tokens = await this.usersService.signIn(email, password);

    res.cookie("authorization", `Bearer ${tokens.accessToken}`);
    res.cookie("refreshToken", tokens.refreshToken);

    return res.status(200).json({ message: "로그인완료" });
  };
  // async signIn(req, res) {
  //   try {
  //     const { email, password } = req.body;
  //     const result = await this.usersService.signIn(email, password);
  //     res.status(result.status).json(result.data);
  //   } catch (err) {
  //     res.status(500).json({ message: err.message });
  //   }
  // }
}
