import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
@Entity({
	name: "tipo_invitacion",
})
export class TipoInvitacion {

    @PrimaryGeneratedColumn()
    id: string;

    @Column({name: "tipo", type: "varchar", length: 20})
    tipo: string;
}


