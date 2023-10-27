import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Evento } from "../evento/Evento";
import { CategoriaRecurso } from "./CategoriaRecurso";
import { EstadoRecurso } from "./EstadoRecurso";

@Entity({
	name: "recurso",
})
export class Recurso {
	@PrimaryGeneratedColumn()
	id: string;

	@Column({ name: "nombre", type: "varchar", length: 255 })
	nombre: string;

	@ManyToOne(() => Evento)
	@JoinColumn({ name: "evento_id" })
	evento: Evento;

	@Column({ name: "descripcion", type: "varchar", length: 255 })
	descripcion: string;

	@Column({ name: "cantidad_necesaria", type: "int" })
	cantidadNecesaria: number;

	@Column({ name: "cantidad_actual", type: "int" })
	cantidadActual: number;

	@ManyToOne(
		() => CategoriaRecurso,
		categoriaRecurso => categoriaRecurso.recursos
	)
	@JoinColumn({ name: "recurso_categoria_id" })
	categoria: CategoriaRecurso;

	@OneToMany(() => EstadoRecurso, estadoRecurso => estadoRecurso.recurso)
	estadosRecurso: EstadoRecurso[];

	@Column({ name: "proveedor", type: "varchar", length: 255, nullable: true })
	proveedor?: string;
	
	@Column({ name: "colorTarjeta", type: "varchar", length: 7, default: "#FFFFFF" })
	colorTarjeta: string;

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

	public getCantidadNecesaria(): number {
		return this.cantidadNecesaria;
	}
	public setCantidadNecesaria(cantidad: number) {
		this.cantidadNecesaria = cantidad;
	}

	public getCantidadActual(): number {
		return this.cantidadActual;
	}
	public setCantidadActual(cantidad: number) {
		this.cantidadActual = cantidad;
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
