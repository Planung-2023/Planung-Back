import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryColumn } from "typeorm";
import { Asistente } from "../asistencia/Asistente";
import { Ubicacion } from "../otros/Ubicacion";
import { Recurso } from "../recursos/Recurso";
import { EstadoEvento } from "./EstadoEvento";

@Entity({
	name: "evento"
})
export  class Evento {
	@PrimaryColumn()
	private id: number;

	@Column({ name: "nombre", type: "varchar", length: 255 })
	private nombre: String;

	@OneToMany(() => Recurso, recurso => recurso.evento)
	private recursos: Recurso[];
	
	@OneToOne(() => Ubicacion)
	@JoinColumn({name:"ubicacion_id"})
	private ubicacion: Ubicacion;

	@Column({ name: "fecha_hora", type: "date" })
	private fechaHora: Date;

	@OneToMany(() => EstadoEvento, estadoEvento => estadoEvento.evento)
	estadoEvento: EstadoEvento;

	@OneToOne(() => Evento)
	@JoinColumn({ name: "evento_anterior_id" })
	private eventoAnterior: Evento;

	@OneToMany(() => Asistente, asistente => asistente.evento)
	private asistentes: Asistente[];

	@Column({ name: "es_visible", type: "boolean" })
	private esVisible: boolean;

	@OneToOne(() => Asistente)
	@JoinColumn({ name: "presentador_asistente_id"})
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
