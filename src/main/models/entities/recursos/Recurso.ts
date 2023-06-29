import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import { Evento } from "../evento/Evento";
import { CategoriaRecurso } from "./CategoriaRecurso";
import { EstadoRecurso } from "./EstadoRecurso";

@Entity({
	name: "recurso",
})
export class Recurso {
	@PrimaryColumn()
	private id: number;

	@Column({ name: "nombre", type: "varchar", length: 255 })
	private nombre: string;

	@ManyToOne(() => Evento)
	@JoinColumn({ name: "evento_id"})
	evento: Evento;

	@Column({ name: "descripcion", type: "varchar", length: 255 })
	private descripcion: string;

	@Column({ name: "cantidad", type: "int" })
	private cantidad: number;

	@ManyToOne(() => CategoriaRecurso, (categoriaRecurso) => categoriaRecurso.recursos)
	@JoinColumn({ name: "recurso_categoria_id"})
	categoria: CategoriaRecurso;

	@OneToMany(() => EstadoRecurso, (estadoRecurso) => estadoRecurso.recurso)
	estadosRecurso: EstadoRecurso[];

	@Column({ name: "proveedor", type: "varchar", length: 255, nullable: true })
	private proveedor?: string;

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

	public getEvento(): Evento {
		return this.evento;
	}

	public setEvento(evento: Evento): void {
		this.evento = evento;
	}

	public getDescripcion(): string {
		return this.descripcion;
	}

	public setDescripcion(descripcion: string): void {
		this.descripcion = descripcion;
	}

	public getCantidad(): number {
		return this.cantidad;
	}

	public setCantidad(cantidad: number) {
		this.cantidad = cantidad;
	}

	public getCategoria(): CategoriaRecurso {
		return this.categoria;
	}

	public setCategoria(categoria: CategoriaRecurso) {
		this.categoria = categoria;
	}

	public getProveedor(): String | undefined {
		return this.proveedor;
	}

	public setProveedor(proveedor: string) {
		this.proveedor = proveedor;
	}
}
