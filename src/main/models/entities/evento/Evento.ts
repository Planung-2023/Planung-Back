import { Asistente } from "../asistencia/Asistente";
import { Ubicacion } from "../otros/Ubicacion";
import { Recurso } from "../recursos/Recurso";
import { EstadoEvento } from "./EstadoEvento";

export class Evento { 
	private id: number;
	private nombre: String;
	private recursos: Recurso[];
	private ubicacion: Ubicacion;
	private fechaHora: Date;
	private estadoEvento: EstadoEvento;
	private eventoAnterior: Evento;
	private asistentes: Asistente[];
	private esVisible: boolean;
	private presentador?: Asistente;
	
	constructor() {}

	public getId(): number {
		return this.id;
	}

	public setId(id: number): void {
		this.id = id;
	}

	public getNombre(): String {
		return this.nombre;
	}

	public setNombre(nombre: String): void {
		this.nombre = nombre;
	}

	public getRecursos(): Recurso[] {
		return this.recursos;
	}

	public setRecursos(recursos: Recurso[]): void {
		this.recursos = recursos;
	}

	public getUbicacion(): Ubicacion {
		return this.ubicacion;
	}

	public setUbicacion(ubicacion: Ubicacion): void {
		this.ubicacion = ubicacion;
	}

	public getFechaHora(): Date {
		return this.fechaHora;
	}

	public setFechaHora(fechaHora: Date): void {
		this.fechaHora = fechaHora;
	}

	public getEstadoEvento(): EstadoEvento {
		return this.estadoEvento;
	}

	public setEstadoEvento(estadoEvento: EstadoEvento): void {
		this.estadoEvento = estadoEvento;
	}

	public getEventoAnterior(): Evento {
		return this.eventoAnterior;
	}

	public setEventoAnterior(eventoAnterior: Evento): void {
		this.eventoAnterior = eventoAnterior;
	}

	public getAsistentes(): Asistente[] {
		return this.asistentes;
	}

	public setAsistentes(asistentes: Asistente[]): void {
		this.asistentes = asistentes;
	}

	public getEsVisible(): boolean {
		return this.esVisible;
	}

	public setEsVisible(esVisible: boolean): void {
		this.esVisible = esVisible;
	}
}
