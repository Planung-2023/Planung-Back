import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { FotoPerfil } from "./FotoPerfil";

@Entity({
    name: "usuario",
})
export class Usuario {
    @PrimaryGeneratedColumn()
    id: string;

    @Column({ name: "idAuth0", type: "varchar", length: 255, nullable: true })
    idAuth0: string;

    @Column({ name: "nombre_usuario", type: "varchar", length: 255, nullable: true })
    nombreUsuario: string;

    @Column({ name: "email", type: "varchar", length: 255 })
    email: string;

    @Column({ name: "nombre", type: "varchar", length: 255, nullable: true })
    nombre: string;

    @Column({ name: "apellido", type: "varchar", length: 255, nullable: true })
    apellido: string;

    @ManyToOne(() => FotoPerfil, { eager: true })
    @JoinColumn({ name: "foto_perfil_id" })
    fotoPerfil: FotoPerfil;

    public getId(): string {
        return this.id;
    }

    public setId(id: string): void {
        this.id = id;
    }

    public getNombreUsuario(): string {
        return this.nombreUsuario;
    }

    public setNombreUsuario(nombreUsuario: string): void {
        this.nombreUsuario = nombreUsuario;
    }

    public setFotoPerfil(fotoPerfil: FotoPerfil | any): void {
        this.fotoPerfil = fotoPerfil;
    }

    public setNombre(nombre: string): void {
        this.nombre = nombre;
    }

    public setApellido(apellido: string): void {
        this.apellido = apellido;
    }
}
