import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Recurso } from "./Recurso";

@Entity({
	name: "recurso_categoria",
})
export class CategoriaRecurso {
	@PrimaryGeneratedColumn()
	id: string;

	@Column({ name: "nombre", type: "varchar", length: 255 })
	nombre: string;

	@Column({ name: "icono", type: "varchar", length: 255 })
	icono: string;

	@OneToMany(() => Recurso, recurso => recurso.categoria)
	recursos: Recurso[];

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

	public getIcono(): string {
		return this.icono;
	}

	public setIcono(icono: string): void {
		this.icono = icono;
	}

	public getRecursos(): Recurso[] {
		return this.recursos;
	}

	public setRecursos(recursos: Recurso[]): void {
		this.recursos = recursos;
	}
}
