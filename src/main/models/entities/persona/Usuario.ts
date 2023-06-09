export class Usuario {

	private id: number;
	private nombreUsuario: string;
	private contrasenia: string;
	
	constructor() { }
	
	public getId(): number {
		return this.id;
	}

	public setId(id: number): void {
		this.id = id;
	}

	public getNombreUsuario(): string {
		return this.nombreUsuario;
	}

	public setNombreUsuario(nombreUsuario: string): void {
		this.nombreUsuario = nombreUsuario;
	}

	public getContrasenia(): string {
		return this.contrasenia;
	}

	public setContrasenia(contrasenia: string): void {
		this.contrasenia = contrasenia;
	}
}
