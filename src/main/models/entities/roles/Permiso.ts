import { Rol } from "./Rol";

export class Permiso {
	constructor(
		private id: number,
		private nombre: string,
		private descripcion: string,
		private roles: Rol[]
	) {}

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

	public getRoles(): Rol[] {
		return this.roles;
	}

	public setRoles(roles: Rol[]): void {
		this.roles = roles;
	}

	public agregarRol(rol: Rol) {
		this.roles.push(rol);
	}
}
