import { Column, Entity, JoinTable, ManyToMany, PrimaryColumn } from "typeorm";
import { Rol } from "./Rol";


 @Entity({
	name:"permiso",
 })

export class Permiso {

	@PrimaryColumn()
	private id: number;

	@Column({ name: "nombre", type: "varchar", length: 255 })
	private nombre: string;

	@Column({ name: "descripcion", type: "varchar", length: 255 })
	private descripcion?: string;

	@ManyToMany(() => Rol)
	@JoinTable({name: "rol_permiso",
		joinColumn: {name: "permiso_id", referencedColumnName: "id"},
		inverseJoinColumn: {name: "rol_id", referencedColumnName:"id"}
	})
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

	public getDescripcion(): string | undefined {
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
