import { Permiso } from "./Permiso";

export class Rol {
	constructor(
		private id: number,
		private nombre: string,
		private permisos: Permiso[]
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

	public getPermisos(): Permiso[] {
		return this.permisos;
	}

	public setPermisos(permisos: Permiso[]): void {
		this.permisos = permisos;
	}

	public agregarPermiso(permiso: Permiso): void {
		this.permisos.push(permiso);
	}
}
