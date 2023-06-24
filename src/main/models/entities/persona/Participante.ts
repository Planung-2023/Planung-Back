import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";
import { Usuario } from "./Usuario";


@Entity({
	name: "participante", 
})

export class Participante {
	
	@PrimaryColumn()
	private id: number;

	@OneToOne(() => Usuario)
	@JoinColumn({name: "usuario_id"})
	private usuario: Usuario;

	@Column({ name: "nombre", type: "varchar", length: 255 })
	private nombre: string;

	@Column({ name: "apellido", type: "varchar", length: 255 })
	private apellido: string;

	@Column({ name: "mail", type: "varchar", length: 255 })
	private mail: string;

	/*@OneToMany(() => Asistente, (asistente) => asistente.participante)
	asistentes: Asistente[]*/
	

	constructor() {}

	public getId(): number {
		return this.id;
	}

	public setId(id: number): void {
		this.id = id;
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
