import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity({
	name: "posible_estado_recurso"
})
export class PosibleEstadoRecurso {

	@PrimaryColumn()
	private id: number;

	@Column({ name: "nombre", type: "varchar", length: 255})
	private nombre: string;

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
}
