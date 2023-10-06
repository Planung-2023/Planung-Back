import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Rol } from "./Rol";


 @Entity({
		name: "permiso",
 })
 export class Permiso {
		@PrimaryGeneratedColumn()
		id: string;

		@Column({ name: "nombre", type: "varchar", length: 255 })
		nombre: string;

		@Column({
			name: "descripcion",
			type: "varchar",
			length: 255,
			nullable: true,
		})
		descripcion?: string;

		@ManyToMany(() => Rol)
		@JoinTable({
			name: "rol_permiso",
			joinColumn: { name: "permiso_id", referencedColumnName: "id" },
			inverseJoinColumn: { name: "rol_id", referencedColumnName: "id" },
		})
		roles: Rol[];

		constructor() {}

		public getId(): string {
			return this.id;
		}

		public setId(id: string): void {
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
