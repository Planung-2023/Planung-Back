import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name: "ubicacion",
})
export class Ubicacion {
    @PrimaryGeneratedColumn()
    id: string;

    @Column({ name: "calle", type: "varchar", nullable: true })
    calle: string;

    @Column({ name: "altura", type: "int", nullable: true })
    altura: number;

    @Column({ type: "varchar", nullable: true })
    localidad: string;

    @Column({ type: "float", nullable: true })
    latitud?: number;

    @Column({ type: "float", nullable: true })
    longitud?: number;

    @Column({ type: "varchar", nullable: true })
    ciudad: string;

    constructor() {}

    public getId(): string {
        return this.id;
    }

    public setId(id: string): void {
        this.id = id;
    }

    public getCalle(): string {
        return this.calle;
    }

    public setCalle(calle: string): void {
        this.calle = calle;
    }

    public getAltura(): number {
        return this.altura;
    }

    public setAltura(altura: number): void {
        this.altura = altura;
    }

    public getLocalidad(): string {
        return this.localidad;
    }

    public setLocalidad(localidad: string): void {
        this.localidad = localidad;
    }

    public getLatitud(): number | undefined {
        return this.latitud;
    }

    public setLatitud(latitud: number): void {
        this.latitud = latitud;
    }

    public getLongitud(): number | undefined {
        return this.longitud;
    }

    public setLongitud(longitud: number): void {
        this.longitud = longitud;
    }

    public getCiudad(): string {
        return this.ciudad;
    }

    public setCiudad(ciudad: string) {
        this.ciudad = ciudad;
    }
}
