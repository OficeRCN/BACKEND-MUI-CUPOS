import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, BaseEntity } from "typeorm";

import { Accesos } from "./Accesos";

@Entity("Cupos")
export class Cupos extends BaseEntity{
    
    @PrimaryGeneratedColumn()
    id:number; 

    @Column()
    nombres: string; 

    @Column()
    apellidos: string; 

    @Column({unique: true})
    cedula: string

    @Column({unique: true})
    correo: string; 

    @Column({unique: true})
    telefono: string; 

    @Column()
    imagen: string; 

    @Column()
    esCliente: boolean; 

    @OneToOne(()=> Accesos)
    @JoinColumn({name:'idAccesos'})
    idAccesos: Accesos | null;

}