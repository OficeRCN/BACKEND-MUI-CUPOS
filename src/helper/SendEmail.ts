const  nodemailer = require('nodemailer');
import * as dotenv from "dotenv";

dotenv.config(); 

export class Email {
    async sendEmailNotificacion(email: string, nombre: string) {

        try {
            const config = nodemailer.createTransport({
                host: "mail.rednuevaconexion.net",
                port: 465,
                secure: true,
                auth: { 
                    user: "registros@rednuevaconexion.net", 
                    pass: "Soporte@2023" }
            })

            const message = {
                from: 'registros@rednuevaconexion.net',
                to: email,
                subject: "RED NUEVA CONEXIÓN - CONFIRMACIÓN",
                text: `
                
                Estimado ${nombre}, gracias por tu registro la informacion asignada es para acceder a uno de nuestros cursos. Esta informacion nos servirá para seguir el proceso de matrícula del curso, una vez se confirmen sus datos, se le enviará un corrreo con los datos de acceso.
                
                Le deseamos un excelente día. 
                
                Att. RED NUEVA CONEXIÓN
                `
            }
            
            await config.sendMail(message);

            } catch (error) {

            console.log(error);

            }
    }
    async sendEmailConfirmado(email: string, nombre: string, ip: string, usuario: string, contrasenia: string) {

        try {
            const config = nodemailer.createTransport({
                host: "mail.rednuevaconexion.net",
                port: 465,
                secure: true,
                auth: { 
                    user: "registros@rednuevaconexion.net", 
                    pass: "Soporte@2023" }
            })

            const message = {
                from: 'registros@rednuevaconexion.net',
                to: email,
                subject: "RED NUEVA CONEXIÓN - CUPOR CONFIRMADO ",
                text: `
                
                Estimado ${nombre}, gracias por tu registro. A continuación te proporcionaremos la informacion asignada es para acceder a uno de nuestros cursos.
                
                IP: ${ip} 
                User: ${usuario}
                Clave: ${contrasenia}
                
                Esta informacion es privada y debe ser manejada solo por usted. No nos responsabilisamos por el mal uso de la información brindada. 
                
                Att. RED NUEVA CONEXIÓN
                
                `
            }
            
            await config.sendMail(message);

            } catch (error) {

            console.log(error);

            }
    }
    async sendEmailDenegado(email: string, nombre:string) {

        try {
            const config = nodemailer.createTransport({
                host: "mail.rednuevaconexion.net",
                port: 465,
                secure: true,
                auth: { 
                    user: "registros@rednuevaconexion.net", 
                    pass: "Soporte@2023" }
            })

            const message = {
                from: 'registros@rednuevaconexion.net',
                to: email,
                subject: "RED NUEVA CONEXIÓN - ACCESO AL CURSO DENEGADO ",
                text: `
                
                Estimado ${nombre}, gracias por su interés en nuestros cursos, pero debido a problemas con su informacion no se le podrá dar acceso a nuestro curso. Lamentamos mucho la situación.
                
                Le deseamos un excelente día. 
                
                Att. RED NUEVA CONEXIÓN`
            }
            
            await config.sendMail(message);
            console.log("Hecho");

            } catch (error) {

            console.log(error);

            }
    }
}
