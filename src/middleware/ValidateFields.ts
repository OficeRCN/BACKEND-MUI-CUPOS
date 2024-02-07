import { Request, Response, NextFunction} from "express";
import { AppDataSource } from "../data-source";
import { Cupos } from "../entity/Cupos";

export class ValidateFields {
    private cupos = AppDataSource.getRepository(Cupos);

    async validateFields(req: Request) {
        return new Promise(async (resolve, reject)=>{
            try {

                const { correo, telefono, cedula } = req.body;
        
                const userExiste = await this.cupos.findOne({ where: { correo}});
    
                if (userExiste) {
                    reject("El correo ya existe");
                }
    
                const telefonoExiste = await this.cupos.findOne({where:{telefono}})
    
                if (telefonoExiste) {
                    reject("El telefono ya existe");
                }

                const cedulaExiste = await this.cupos.findOne({where: {cedula}})

                if (cedulaExiste) {
                    reject("La cedula ya existe");
                }

                resolve("ok")
    
            } catch (error) {
                return reject("Ha ocurrido un error al validar los campos")
            }
        })
        
    }
    
}
