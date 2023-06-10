import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity({
	name: 'recurso_categoria'
})
export class CategoriaRecurso {
	@PrimaryColumn()
	private id: number;

	@Column({ name: 'nombre', type: 'varchar', length: 255 })
	private nombre: string;

	@Column({ name: 'icono', type: 'varchar', length: 255 })
	private icono: string;

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
}
