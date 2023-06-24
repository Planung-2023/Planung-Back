import { Column, Entity, ManyToMany, PrimaryColumn } from "typeorm";
import { Permiso } from "./Permiso";

@Entity({
	name: "rol",
})
export class Rol {

	@PrimaryColumn()
	private id: number;

	@Column({ name: "nombre", type: "varchar", length: 255 })
	private nombre: string;

	@ManyToMany(() => Permiso)
	private permisos: Permiso[];

	constructor() {}

	public getId(): number {
		return this.id;
	}

	public setId(id: number): void {
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
