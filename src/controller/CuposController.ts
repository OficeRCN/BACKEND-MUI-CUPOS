import { AppDataSource } from "../data-source";
import { Request, Response, NextFunction } from "express";
import { Cupos } from "../entity/Cupos";
import { Accesos } from "../entity/Accesos";
import { UploadFiles } from "../helper/UploadFile";
import { ValidateFields } from "../middleware/ValidateFields";
import { Email } from "../helper/SendEmail";
import path = require("path");
import { DeleteImages } from "../helper/DeleteImage";

const uf = new UploadFiles();
const vf = new ValidateFields();
const se = new Email();
const di = new DeleteImages();

export class CuposController {
  async getAll(req: Request, response: Response) {
    try {
      const data = await Cupos.find({
        relations: ["idAccesos"],
      });
      response.status(200).send(data);
    } catch (error) {
      return response.status(500).json({ msg: "Error al obtener los datos" });
    }
  }

  async sendImage(req: Request, response: Response) {
    try {
      const rutaRaiz = path.join(__dirname, "..");
      var filePath = path.resolve(
        rutaRaiz + "/comprobantes/" + req.params.imagenRecibida
      );
      response.sendFile(filePath);
    } catch (error) {
      return response.status(500).json({ msg: "Error al obtener los datos" });
    }
  }

  async getOneById(request: Request) {
    const id = parseInt(request.params.id);

    const cupo = await Cupos.findOne({
      where: { id },
    });

    if (!cupo) {
      return "No se ha registrado este cupo";
    }

    return cupo;
  }

  async saveCupo(request: any, response: Response, next: NextFunction) {
    try {
      let { esCliente } = request.body;

      await vf.validateFields(request);

      await se.sendEmailNotificacion(request.body.correo, request.body.nombres);

      if (!request.files) {
        return response
          .status(400)
          .json({ msg: "Imagen no encontrada en la solicitud" });
      }

      const imagen = await uf.subirArchivo(request.files.imagen);

      esCliente = esCliente == 1 ? true : false;

      await Cupos.save({
        ...request.body,
        imagen,
        esCliente,
      });

      response.status(204).json({ msg: "Correcto" });
    } catch (error) {
      return response
        .status(400)
        .json({ msg: "Datos duplicados, no puede enviar su formulario" });
    }
  }

  async updateCupo(request: Request, response: Response, next: NextFunction) {
    try {
      const {
        nombres,
        apellidos,
        cedula,
        correo,
        telefono,
        imagen,
        esCliente,
        idAccesos,
      } = request.body;

      const accessCupoExist = await Cupos.findOneBy({
        idAccesos,
      });

      if (!accessCupoExist)
        throw new Error(
          "El cupo ya ha sido asignado, por favor seleccione otra ip"
        );

      const accessExist = await Accesos.findOneBy({
        id: idAccesos,
      });

      if (!accessExist) throw new Error("Error al actualizar el cupo");

      await se.sendEmailConfirmado(
        correo,
        nombres,
        accessExist.ip,
        accessExist.usuario,
        accessExist.contrasenia
      );

      const cupos = await Cupos.findOneBy({ cedula });

      if (!cupos)
        return response.status(404).json({ msg: "El cupo no existe" });

      cupos.nombres = nombres;
      cupos.apellidos = apellidos;
      cupos.cedula = cedula;
      cupos.correo = correo;
      cupos.telefono = telefono;
      cupos.imagen = imagen;
      cupos.esCliente = esCliente == "Si" ? true : false;
      cupos.idAccesos = idAccesos;

      await Cupos.save(cupos);
      response.status(204).json({ msg: "Correcto" });
    } catch (error) {
      return response.status(400).json({ msg: error });
    }
  }

  async getCount(request: Request, response: Response, next: NextFunction) {
    try {
      const count = await Cupos.count();

      return response.send(count.toString());
    } catch (error) {
      next(error);
    }
  }

  async removeCupo(request: Request, response: Response) {
    try {
      const cedula = request.params.cedula;
      const imageName = request.params.imageName;

      let cupoToRemove = await Cupos.findOneBy({ cedula });

      if (!cupoToRemove) throw new Error("El cupo no existe");

      await se.sendEmailDenegado(request.params.correo, request.params.nombres);
      di.deleteImage(imageName);
      await Cupos.remove(cupoToRemove);

      return response.status(200).json({ msg: "Eliminado correctamente" });
    } catch (error) {
      return response.status(500).json({ msg: error });
    }
  }
}
