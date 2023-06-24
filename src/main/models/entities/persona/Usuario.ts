import { Column, Entity, JoinColumn, PrimaryColumn } from "typeorm";

@Entity({
	name: "Usuario",
})
export class Usuario {


	@PrimaryColumn()
	private id: number;

	@Column({ name: "nombre_usuario", type: "varchar", length: 255 })
	private nombreUsuario: string;

	@Column({name: "contrasenia", type: "varchar", length: 255})
	private contrasenia: string;
	
	constructor() { }
	
	public getId(): number {
		return this.id;
	}

	public setId(id: number): void {
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
}
