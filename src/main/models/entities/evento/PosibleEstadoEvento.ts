import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity({
	name: "posible_estado_evento"
})
export class PosibleEstadoEvento {

	@PrimaryColumn()
	private id: number;

	@Column({ type: "varchar", length: 255 })
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
