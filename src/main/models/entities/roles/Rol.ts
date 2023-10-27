import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Permiso } from "./Permiso";

@Entity({
	name: "rol",
})
export class Rol {
	@PrimaryGeneratedColumn()
	id: string;

	@Column({ name: "nombre", type: "varchar", length: 255 })
	nombre: string;

	@ManyToMany(() => Permiso)
	permisos: Permiso[];

	constructor() {}

	public getId(): string {
		return this.id;
	}

	public setId(id: string): void {
		this.id = id;
	}

	public getNombre(): string {
		return this.nombre;
	}

	public setNombre(nombre: string): void {
		this.nombre = nombre;
	}

	public getPermisos(): Permiso[] {
		return this.permisos;
	}

	public setPermisos(permisos: Permiso[]): void {
		this.permisos = permisos;
	}

	public agregarPermiso(permiso: Permiso): void {
		this.permisos.push(permiso);
	}
}
