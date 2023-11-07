import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { FotoPerfil } from "./FotoPerfil";

@Entity({
    name: "usuario",
})
export class Usuario {
    @PrimaryGeneratedColumn()
    id: string;

    @Column({ name: "nombre_usuario", type: "varchar", length: 255 })
    nombreUsuario: string;

    @Column({ name: "contrasenia", type: "varchar", length: 255, nullable: true })
    contrasenia: string;

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

    public getContrasenia(): string {
        return this.contrasenia;
    }

    public setContrasenia(contrasenia: string): void {
        this.contrasenia = contrasenia;
    }

    public setFotoPerfil(fotoPerfil: FotoPerfil): void {
        this.fotoPerfil = fotoPerfil;
    }
}
