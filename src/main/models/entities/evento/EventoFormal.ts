import { Asistente } from "../asistencia/Asistente";
import { Evento } from "./Evento";

export class EventoFormal extends Evento {
	private presentador?: Asistente;

	constructor() {
		super();
	}
}
