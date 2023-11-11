import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Evento } from "../evento/Evento";

@Entity({
    name: "evento_presentacion",
})
export class EventoPresentacion {
    @PrimaryGeneratedColumn({ name: "idevento_presentacion" })
    idevento_presentacion: number;

    @Column({
        name: "referencia_archivo",
        type: "varchar",
        length: 255,
        nullable: false,
    })
    referencia_archivo: string;

    @Column({ name: "nombre", type: "varchar", length: 45, nullable: true })
    nombre: string;

    @Column({ name: "evento_id", type: "int", nullable: true })
    evento_id: number;

    @ManyToOne(() => Evento, (evento) => evento.evento_presentaciones, {
        onDelete: "NO ACTION",
        onUpdate: "NO ACTION",
    })
    @JoinColumn({ name: "evento_id" })
    evento: Evento;

    public getIdeventoPresentacion(): number {
        return this.idevento_presentacion;
    }

    public getReferenciaArchivo(): string {
        return this.referencia_archivo;
    }

    public setReferenciaArchivo(referencia_archivo: string): void {
        this.referencia_archivo = referencia_archivo;
    }

    public getNombre(): string {
        return this.nombre;
    }

    public setNombre(nombre: string): void {
        this.nombre = nombre;
    }

    public getEventoId(): number {
        return this.evento_id;
    }

    public setEventoId(evento_id: number): void {
        this.evento_id = evento_id;
    }

    public getEvento(): Evento {
        return this.evento;
    }

    public setEvento(evento: Evento): void {
        this.evento = evento;
    }
}
