import {Request, Response} from "express"; 

export class Files{
    validateFileUploaded(request: Request, response: Response){
        if(!request.body.files || Object.keys(request.body.files).length === 0 || request.body.files.archivo){
            return response.status(400).json({
                msg: "No hay archivos para subir"
            })
        }
    }
}