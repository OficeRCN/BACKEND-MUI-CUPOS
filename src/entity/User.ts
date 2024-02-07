import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  BeforeUpdate,
  BaseEntity,
} from "typeorm";
import * as bcrypt from "bcrypt";

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({unique: true})
  correo: string;

  @Column()
  contrasenia: string;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
      if (this.contrasenia) {
          const hash = await bcrypt.hash(this.contrasenia, 10);
          this.contrasenia = hash;
      }
  }
  
}
