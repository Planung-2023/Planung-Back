import { Asistente } from "../asistencia/Asistente";
import { Recurso } from "./Recurso";

export class AsignacionRecurso {

	private id: number;
	private recurso: Recurso;
	private asistente: Asistente;
	private fechaHora: Date;
	private cantidad: number;
	private comentarios?: string;

	constructor() {}

	public getId(): number {
		return this.id;
	}

	public setId(id: number): void {
		this.id = id;
	}

	public getRecurso(): Recurso {
		return this.recurso;
	}

	public setRecurso(recurso: Recurso): void {
		this.recurso = recurso;
	}

	public getAsistente(): Asistente {
		return this.asistente;
	}

	public setAsistente(asistente: Asistente): void {
		this.asistente = asistente;
	}

	public getFechaHora(): Date {
		return this.fechaHora;
	}

	public setFechaHora(fechaHora: Date): void {
		this.fechaHora = fechaHora;
	}

	public getCantidad(): number {
		return this.cantidad;
	}

	public setCantidad(cantidad: number): void {
		this.cantidad = cantidad;
	}

	public getComentarios(): String | undefined{
		return this.comentarios;
	}

	public setComentarios(comentarios: string): void {
		this.comentarios = comentarios;
	}
}
