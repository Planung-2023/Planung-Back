import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity({
	name: "posible_estado_evento",
})
export class PosibleEstadoEvento {
	@PrimaryColumn()
	id: string;

	@Column({ type: "varchar", length: 255 })
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
