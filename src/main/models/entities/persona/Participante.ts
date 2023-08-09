import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";
import { Usuario } from "./Usuario";


@Entity({
	name: "participante", 
})
export class Participante {
	@PrimaryColumn()
	id: string;

	@OneToOne(() => Usuario)
	@JoinColumn({name: "usuario_id"})
	usuario: Usuario;

	@Column({ name: "nombre", type: "varchar", length: 255 })
	nombre: string;

	@Column({ name: "apellido", type: "varchar", length: 255 })
	apellido: string;

	@Column({ name: "mail", type: "varchar", length: 255 })
	mail: string;

	constructor() {}

	public getId(): string {
		return this.id;
	}

	public getUsuario(): Usuario {
		return this.usuario;
	}

	public setUsuario(usuario: Usuario): void {
		this.usuario = usuario;
	}

	public getNombre(): string {
		return this.nombre;
	}

	public setNombre(nombre: string): void {
		this.nombre;
	}

	public getApellido(): string {
		return this.apellido;
	}

	public setApellido(apellido: string): void {
		this.apellido = apellido;
	}

	public getMail(): string {
		return this.mail;
	}

	public setMail(mail: string): void {
		this.mail = mail;
	}
}
