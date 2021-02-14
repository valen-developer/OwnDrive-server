import { Request, Response } from "express";
import { Crypt } from "../../../context/shared/domain/interfaces/crypt.interface";
import { JWT } from "../../../context/shared/domain/interfaces/jsonwebtoken.interface";
import { Signin } from "../../../context/Users/application/signinUser";
import { UserRepository } from "../../../context/Users/domain/userRepository.interface";
import { enviroment } from "../../config/enviroment";
import { Controller } from "../controller.interface";

export class SigninController implements Controller {
  private userRepository: UserRepository;
  private crypt: Crypt;
  private jwt: JWT;

  constructor(userRepository: UserRepository, crypt: Crypt, jwt: JWT) {
    this.userRepository = userRepository;
    this.crypt = crypt;
    this.jwt = jwt;
  }

  public async run(req: Request, res: Response) {
    const body = req.body;

    try {
      const singinUser = new Signin(this.userRepository, this.crypt);

      const user = await singinUser.signin(body.email, body.password);

      res.json({
        ok: true,
        user,
        token: user.validated
          ? this.jwt.sign(user, enviroment.token.seed, {
              expireIn: enviroment.token.expireIn,
            })
          : null,
      });
    } catch (error) {
      let statusCode = 500;

      if (error.statusCode) statusCode = error.statusCode;

      res.status(statusCode).json({
        ok: false,
        error: error.message,
      });
    }
  }
}
