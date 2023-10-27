import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Asistente } from "../asistencia/Asistente";
import { Recurso } from "./Recurso";

@Entity({
	name: "asignacion_recurso",
})
export class AsignacionRecurso {
	@PrimaryGeneratedColumn()
	id: string;

	@ManyToOne(() => Recurso)
	recurso: Recurso;

	@ManyToOne(() => Asistente, {
		eager: true,
	})
	asistente: Asistente;

	@Column({
		name: "fecha_hora",
		type: "date"
		//default: () => "CURRENT_TIMESTAMP",
	})
	fechaHora: Date;

	@Column({ name: "cantidad", type: "double" })
	cantidad: number;

	@Column({ type: "varchar", length: 255, nullable: true })
	comentarios?: string;

	constructor() {}

	public getId(): string {
		return this.id;
	}

	public setId(id: string): void {
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

	public getComentarios(): String | undefined {
		return this.comentarios;
	}

	public setComentarios(comentarios: string): void {
		this.comentarios = comentarios;
	}
}
