import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({
	name: "posible_estado_recurso",
})
export class PosibleEstadoRecurso {
	@PrimaryGeneratedColumn()
	id: string;

	@Column({ name: "nombre", type: "varchar", length: 255 })
	nombre: string;

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
}
