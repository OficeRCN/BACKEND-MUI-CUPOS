import * as fs from "fs"

export class DeleteImages {
    deleteImage(imageName: string): void {
        const rootPath = './src/comprobantes/';
        const imagePath = rootPath + imageName;
    
        if (fs.existsSync(imagePath)) {
            fs.unlinkSync(imagePath);
            console.log(`La imagen ${imageName} ha sido eliminada exitosamente.`);
        } else {
            console.log(`La imagen ${imageName} no existe en el servidor.`);
        }
    }
}