import { Asistente } from "../asistencia/Asistente";
import { Ubicacion } from "../otros/Ubicacion";
import { Recurso } from "../recursos/Recurso";
import { EstadoEvento } from "./EstadoEvento";
import { Evento } from "./Evento";

export class EventoFormal extends Evento {
	constructor(
		id: number,
		nombre: String,
		recursos: Recurso[],
		ubicacion: Ubicacion,
		fechaHora: Date,
		estadoEvento: EstadoEvento,
		eventoAnterior: Evento,
		asistentes: Asistente[],
		esVisible: boolean,
		private presentador?: Asistente
	) {
		super(
			id,
			nombre,
			recursos,
			ubicacion,
			fechaHora,
			estadoEvento,
			eventoAnterior,
			asistentes,
			esVisible
		);
	}
}
