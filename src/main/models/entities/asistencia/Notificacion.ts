export class Notificacion {

	private id: number;
	private fechaHora: Date;
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
