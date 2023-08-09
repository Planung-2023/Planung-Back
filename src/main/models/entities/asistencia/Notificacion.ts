import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity({
	name: "notificacion",
})
export class Notificacion {
	@PrimaryColumn()
	id: string;

	@Column({ name: "fecha_hora", type: "date" })
	fechaHora: Date;

	@Column({ type: "text" })
	mensaje: string;

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

