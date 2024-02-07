import { Column, PrimaryGeneratedColumn, Entity, BaseEntity} from "typeorm";

@Entity("Configuraciones")
export class Configuraciones extends BaseEntity{
    
    @PrimaryGeneratedColumn()
    id: number; 

    @Column()
    cantidadCupos: number; 

    @Column()
    linkReuniones: string; 

}