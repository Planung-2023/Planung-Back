export class Permiso {
	private id: number;
	private nombre: string;
	private descripcion: string;
	//TODO: roles tipo Rol
	private roles: any;

	public getId(): number {
		return this.id;
	}

	public setId(id: number): void {
		this.id = id;
	}

	public getNombre(): string {
		return this.nombre;
	}

	public setNombre(nombre: string): void {
		this.nombre = nombre;
	}

	public getDescripcion(): string {
		return this.descripcion;
	}

	public setDescripcion(descripcion: string): void {
		this.descripcion = descripcion;
	}

	public getRoles(): any {
		return this.roles;
	}
}
