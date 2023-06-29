import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";
import { Asistente } from "./Asistente";

@Entity({
	name: "invitacion",
})

export class Invitacion {
	
	@PrimaryColumn()
	private id: number;

	@Column({ name: "fecha_hora_envio", type:"date"})
	private fechaHoraEnvio: Date;

	@Column({ name: "fecha_hora_visto", type: "date", nullable: true})
	private fechaHoraVisto?: Date;

	@Column({name: "fecha_hora_respuesta", type:"date"})
	private fechaHoraRespuesta: Date;

	@Column({name:"esta_visto", type: "boolean", nullable: true})
	private estaVisto?: boolean;
	
	@Column({name:"esta_aceptado", type:"boolean"})
	private estaAceptado: boolean;
	
	@OneToOne(() => Asistente)
	@JoinColumn({name:"asistente_id"})
	private asistente: Asistente;
		
	constructor() {}

	public getId(): number {
		return this.id;
	}

	public setId(id: number): void {
		this.id = id;
	}

	public getAsistente(): Asistente {
		return this.asistente;
	}

	public setAsistente(asistente: Asistente): void {
		this.asistente = asistente;
	}

	public getFechaHoraEnvio(): Date {
		return this.fechaHoraEnvio;
	}

	public setFechaHoraEnvio(fechaHoraEnvio: Date): void {
		this.fechaHoraEnvio = fechaHoraEnvio;
	}

	public getFechaHoraVisto(): Date | undefined  {
		return this.fechaHoraVisto;
	}

	public setFechaHoraVisto(fechaHoraVisto: Date): void {
		this.fechaHoraVisto = fechaHoraVisto;
	}

	public getFechaHoraRespuesta(): Date {
		return this.fechaHoraRespuesta;
	}

	public setFechaHoraRespuesta(fechaHoraRespuesta: Date): void {
		this.fechaHoraRespuesta = fechaHoraRespuesta;
	}

	public getEstaVisto(): boolean | undefined {
		return this.estaVisto;
	}

	public setEstaVisto(estaVisto: boolean): void {
		this.estaVisto = estaVisto;
	}

	public isEstaAceptado(): boolean {
		return this.estaAceptado;
	}

	public setEstaAceptado(estaAceptado: boolean): void {
		this.estaAceptado = estaAceptado;
	}
}
