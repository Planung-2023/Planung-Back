import { Entity, PrimaryColumn, Column, ManyToMany, JoinTable } from "typeorm";
import { Rol } from "./Rol";


 @Entity({
	name:"rol",
 })

export class Permiso {

	@PrimaryColumn()
	private id: number;

	@Column({ name: "nombre", type: "varchar", length: 255 })
	private nombre: string;

	@Column({ name: "descripcion", type: "varchar", length: 255 })
	private descripcion: string;

	@ManyToMany(() => Rol)
	@JoinTable({name: "rol_permiso"})
	private roles: Rol[];

	constructor() {}

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
