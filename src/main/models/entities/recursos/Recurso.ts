import { Evento } from "../evento/Evento";
import { CategoriaRecurso } from "./CategoriaRecurso";

export class Recurso {
	constructor(
		private id: number,
		private nombre: string,
		private evento: Evento,
		private descripcion: string,
		private cantidad: number,
		private categoria: CategoriaRecurso,
		private proveedor?: string
	) {}

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
