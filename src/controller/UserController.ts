import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { User } from "../entity/User";

export class UserController {
  async getAllUsers(request: Request, response: Response, next: NextFunction) {
    response.send(await User.find());
  }

  async getOneUser(correo: string) {
    return await User.findOneBy({ correo });
  }

  async getCountUser(req: Request, res: Response) {
    const count = await User.count();
    return res.json({count})
  }

  async saveUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { correo, contrasenia } = req.body;

      const user = new User();
      user.correo = correo;
      user.contrasenia = contrasenia;

      const data = await User.save(user);
      res.send(data);
    } catch (error) {
      res.send(error);
    }
  }
}
