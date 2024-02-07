import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";

import { UserController } from "./UserController";

const uc = new UserController();

export class Auth {
  async loginHandler(req: Request, res: Response) {
    try {
      const exist = await uc.getOneUser(req.body.usuario);

      if (!exist) return res.status(404).json({ msg: "No existe el usuario" });

      const result = await bcrypt.compare(
        req.body.contrasenia,
        exist.contrasenia
      );

      if(!result) return res.status(404).json({ msg: "Contraseña incorrecta" });

      const { contrasenia, ...rta } = exist;

      const token = jwt.sign(
        {
          ...rta,
        },
        "Cl@veSecret@-",
        { expiresIn: "1h" }
      );

      return res.json({ token: token });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({ msg: error.message });
      }
    }
  }

  userHandler(req: Request, res: Response) {
    try {
      req.user;
      res.json({
        user: req.user,
        msg: "Hola gg",
      });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({ msg: error.message });
      }
    }
  }
}
