import { Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Recurso } from "./Recurso";

@Entity({
	name: "recurso_categoria",
})
export class CategoriaRecurso {
	@PrimaryGeneratedColumn()
	private id: number;

	@Column({ name: "nombre", type: "varchar", length: 255 })
	private nombre: string;

	@Column({ name: "icono", type: "varchar", length: 255 })
	private icono: string;

	@OneToMany(() => Recurso, recurso => recurso.categoria)
	recursos: Recurso[];

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
