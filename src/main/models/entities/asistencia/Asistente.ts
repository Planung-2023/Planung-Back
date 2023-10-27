import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Evento } from "../evento/Evento";
import { Participante } from "../persona/Participante";
import { Rol } from "../roles/Rol";
import { Asistencia } from "./Asistencia";
import { AsistenteNotificacion } from "./AsistenteNotificacion";
import { Invitacion } from "./Invitacion";



@Entity({
	name: "asistente",
})
export class Asistente {
	@PrimaryGeneratedColumn()
	id: string;

	@ManyToOne(() => Evento)
	@JoinColumn({ name: "evento_id" })
	evento: Evento;

	@ManyToOne(() => Participante, { eager: true })
	@JoinColumn({ name: "participante_id" })
	participante: Participante;

	@ManyToOne(() => Rol, { eager: true })
	@JoinColumn({ name: "rol_id" })
	rol: Rol;

	@OneToOne(() => Invitacion)
	invitacion: Invitacion;

	@OneToOne(() => Asistencia)
	@JoinColumn({ name: "asistencia_id" })
	asistencia: Asistencia;

	@OneToMany(
		() => AsistenteNotificacion,
		asistenteNotificacion => asistenteNotificacion.asistente
	)
	asistenteNotificaciones: AsistenteNotificacion[];

	@Column("boolean", {
		default: true
	})
	activo: boolean;

	constructor() {}

	public getId(): string {
		return this.id;
	}

	public setId(id: string): void {
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
		return this.asistenteNotificaciones;
	}

	public setAsistenciaNotificaciones(
		asistenciaNotificaciones: AsistenteNotificacion[]
	): void {
		this.asistenteNotificaciones = asistenciaNotificaciones;
	}
}
