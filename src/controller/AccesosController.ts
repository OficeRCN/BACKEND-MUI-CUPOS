import { Accesos } from "../entity/Accesos";
import { Request, Response } from "express";

export class AccesosController {
  async getAccesos(request: Request, response: Response) {
    try {
      const data = await Accesos.find();
      response.status(200).send(data);
    } catch (error) {
      return response.status(500).json({ msg: "Error al obtener los datos" });
    }
  }

  async getOneById(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);

      const acceso = await Accesos.findOne({ where: { id } });

      if (!acceso)
        return res.status(404).send({ message: "No se encontro el recurso" });

      res.status(200).send(acceso);
    } catch (error) {
      return res.status(400).send("Acceso no encontrado");
    }
  }

  async createAcceso(req: Request, res: Response) {
    try {
      await Accesos.save({
        ...req.body,
      });
      res.status(204).json({ msg: "Correcto" });
    } catch (error) {
      return res.status(400).json({ msg: "Error al crear el acceso" });
    }
  }

  async updateAcceso(req: Request, res: Response) {
    try {
      const ip = req.body.ip;
      const acceso = await Accesos.findOneBy({ ip });
      if (!acceso) throw new Error("El acceso solicidado no existe");

      acceso.ip = req.body.ip;
      acceso.usuario = req.body.usuario;
      acceso.contrasenia = req.body.contrasenia;

      await Accesos.save(acceso);
      res.status(204).json({ msg: "Correcto" });
    } catch (error) {
      return res.status(400).json({ msg: "Error al crear el acceso" });
    }
  }

  async getCountAccesos(req: Request, res: Response) {
    try {
      const count = await Accesos.count();
      return res.send(count.toString());
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ msg: error.message });
      }
    }
  }

  async deleteAcceso(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);

      const accesoExiste = await Accesos.findOneBy({ id });

      if (!accesoExiste)
        return res.status(404).json({ msg: "No existe el acceso" });

      console.log(accesoExiste);

      await Accesos.delete(accesoExiste.id);

      return res.status(200).send("Eliminado exitosamente");
    } catch (error) {
      return res.status(500).json({ msg: "Error al eliminar el acceso" });
    }
  }
}
