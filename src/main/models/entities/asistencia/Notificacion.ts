import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity({
	name: "notificacion",
})
export class Notificacion {
	@PrimaryColumn()
	private id: number;

	@Column({ name: "fecha_hora", type: "date" })
	private fechaHora: Date;

	@Column({ type: "text" })
	private mensaje: string;

	constructor() {}

	public getId(): number {
		return this.id;
	}

	public setId(id: number): void {
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

