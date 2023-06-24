import { Entity, JoinColumn, ManyToOne, OneToOne, PrimaryColumn } from "typeorm";
import { Evento } from "../evento/Evento";
import { Participante } from "../persona/Participante";
import { Rol } from "../roles/Rol";
import { AsistenteNotificacion } from "./AsistenteNotificacion";
import { Invitacion } from "./Invitacion";



@Entity({
	name: "asistente",
})
export class Asistente {

	@PrimaryColumn()
	private id: number;

	private evento: Evento;

	@ManyToOne(() => Participante)
	@JoinColumn({ name: "participante_id" })
	participante: Participante;

	@ManyToOne(() => Rol)
	@JoinColumn({ name: "rol_id" })
	private rol: Rol;
	
	@OneToOne(() => Invitacion)
	private invitacion: Invitacion;

	private asistenciaNotificaciones: AsistenteNotificacion[];
	
	constructor() {}

	public getId(): number {
		return this.id;
	}

	public setId(id: number): void {
		this.id = id;
	}

	public getEvento(): Evento {
		return this.evento;
	}

	public setEvento(evento: Evento): void {
		this.evento = evento;
	}

	public getParticipante(): Participante {
		return this.participante;
	}

	public setParticipante(participante: Participante): void {
		this.participante = participante;
	}

	public getRol(): Rol {
		return this.rol;
	}

	public setRol(rol: Rol): void {
		this.rol = rol;
	}

	public getInvitacion(): Invitacion {
		return this.invitacion;
	}

	public setInvitacion(invitacion: Invitacion): void {
		this.invitacion = invitacion;
	}

	public getAsistenciaNotificaciones(): AsistenteNotificacion[] {
		return this.asistenciaNotificaciones;
	}

	public setAsistenciaNotificaciones(
		asistenciaNotificaciones: AsistenteNotificacion[]
	): void {
		this.asistenciaNotificaciones = asistenciaNotificaciones;
	}
}
