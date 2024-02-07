import { Configuraciones } from "../entity/Config";
import { Response, Request } from "express";

export class ConfiguracionesController {
  async getAllConfigs(req: Request, res: Response) {
    try {
      const data = await Configuraciones.find();
      console.log(data);
      if (!data || data.length === 0)
        throw new Error("No se encontraron configuraciones");
      res.status(200).send(data);
    } catch (error) {
      res.status(500).json({ msg: "Error al consultar los datos" });
    }
  }

  async getMaxCupo(req: Request, res: Response) {
    try {
      let maxCupos = await Configuraciones.createQueryBuilder("Configuraciones")
        .select("MAX(Configuraciones.cantidadCupos)", "maxCupos")
        .getRawOne();

      return res.status(200).json({ msg: maxCupos });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({ msg: error.message });
      }
    }
  }

  async getMaxLink(req: Request, res: Response) {
    try {
      let maxLinks = await Configuraciones.createQueryBuilder("Configuraciones")
        .select("MAX(Configuraciones.linkReuniones)", "maxLinks")
        .getRawOne();

      return res.status(200).json({ msg: maxLinks });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({ msg: error.message });
      }
    }
  }

  async getConfigById(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);

      const data = await Configuraciones.findOneBy({ id });

      if (!data) throw new Error("No se encontró la configuración");

      res.status(200).send(data);
    } catch (error) {
      res.status(500).json({ msg: "Error al consultr los datos" });
    }
  }

  async saveConfig(req: Request, res: Response) {
    try {
      const data = await Configuraciones.save({
        ...req.body,
      });

      res.status(200).json({ msg: data });
    } catch (error) {
      res.status(500).json({ msg: error });
    }
  }

  async updateConfig(req: Request, res: Response) {
    try {
      const {cantidadCupos, linkReuniones, id} = req.body; 

      const configs = await Configuraciones.findOneBy({id})

      if(!configs) return res.status(404).json({msg: "No existe la configuración"})

      configs.cantidadCupos = cantidadCupos; 
      configs.linkReuniones = linkReuniones; 

      const data = await Configuraciones.save(configs);

      res.status(200).json({ msg: data });
    } catch (error) {
      res.status(500).json({ msg: error });
    }
  }

  async deleteConfig(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);

      const exist = await Configuraciones.findOneBy({ id });

      if (!exist)
        throw new Error(
          "No se puede eliminar porque esta configuración no existe"
        );

      await Configuraciones.delete(id);

      res.status(204).json({ msg: "Eliminado correctamente" });
    } catch (error) {
      res.status(500).json({ msg: error });
    }
  }
}
