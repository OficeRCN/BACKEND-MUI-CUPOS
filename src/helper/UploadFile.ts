import { v4 as uuidv4 } from "uuid";
const path = require("path");

export class UploadFiles {
  subirArchivo(
    archivo: any,
    extensionesValidas = ["png", "jpg", "jpeg"],
    carpeta = ""
  ) {
    return new Promise((resolve: any, reject: any) => {
      const nombreCortado = archivo.name.split(".");
      const extension = nombreCortado[1];
      if (!extensionesValidas.includes(extension)) {
        return reject(`La extension ${extension} no está permitida`);
      }

      const nombreTemp = uuidv4() + "." + extension;
      const uploadPath = path.join(
        __dirname,
        "../comprobantes/",
        carpeta,
        nombreTemp
      );

      archivo.mv(uploadPath, (err: Error) => {
        if (err) {
          reject(err);
        }
        resolve(nombreTemp);
      });
    });
  }
}
