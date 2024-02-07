import { PrimaryGeneratedColumn, Column, Entity, BaseEntity } from "typeorm";

@Entity("Accesos")
export class Accesos extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number; 

    @Column()
    ip: string; 

    @Column()
    usuario: string;  

    @Column()
    contrasenia: string

}