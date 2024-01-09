import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Usuario } from "../persona/Usuario";

@Entity({
	name: "notificacion",
})
export class Notificacion {
	@PrimaryGeneratedColumn()
	id: string;

	@Column({ name: "fecha_hora", type: "date" })
	fechaHora: Date;

	@Column({ type: "text" })
	mensaje: string;

	@Column({name: "vista", type: "bool"})
	vista: boolean;

	@ManyToOne(() => Usuario, { eager: true })
    usuario: Usuario;

	constructor() {}

	public getId(): string {
		return this.id;
	}

	public setId(id: string): void {
		this.id = id;
	}

	public getFechaHora(): Date {
		return this.fechaHora;
	}

	public setFechaHora(fechaHora: Date): void {
		this.fechaHora = fechaHora;
	}

	public getMensaje(): string {
		return this.mensaje;
	}

	public setMensaje(mensaje: string): void {
		this.mensaje = mensaje;
	}
}
function PrimaryColum(target: Notificacion, propertyKey: "id"): void {
	throw new Error("Function not implemented.");
}

