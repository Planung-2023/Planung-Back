import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Usuario } from "./Usuario";

@Entity({
  name: "foto_perfil",
})
export class FotoPerfil {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "nombre", type: "varchar", length: 255 })
  nombre: string;

  @OneToMany(() => Usuario, (usuario) => usuario.fotoPerfil)
  usuarios: Usuario[];
}
