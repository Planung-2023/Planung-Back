import { Participante } from "../entities/persona/Participante";

export class FactoryParticipante {

    public static async crearParticipante(parametros: any) {
        const participante = new Participante();

        if(parametros.nombre !== undefined) {
            participante.nombre = parametros.nombre;
        }

        if(parametros.apellido !== undefined) {
            participante.apellido = parametros.apellido;
        }

        participante.mail= parametros.email;

        participante.usuario = parametros.usuario;

        return participante;
    }
}
