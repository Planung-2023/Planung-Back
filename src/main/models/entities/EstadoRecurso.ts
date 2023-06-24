
import { PosibleEstadoRecurso } from "./PosibleEstadoRecurso";
import { Recurso } from "./Recurso";

export class EstadoRecurso {


    private posibleEstadoRecurso: PosibleEstadoRecurso;
    private recurso: Recurso;
    private fechaHora: Date;
    constructor(posibleEstadoRecurso: PosibleEstadoRecurso, recurso: Recurso, fechaHora: Date)
    {

    }

    public getPosibleEstadoRecuso() : PosibleEstadoRecurso{
        return this.posibleEstadoRecurso;
    }

    public setPosibleEstadoRecurso(posibleEstadoRecurso : PosibleEstadoRecurso) : void{
        this.posibleEstadoRecurso = posibleEstadoRecurso;
    }

    public getRecurso() : Recurso {
        return this.recurso; 
    }

    public setRecurso(recurso :Recurso) : void{
        this.recurso = recurso;
    }

    public getFechaHora() : Date {
        return this.fechaHora;
    }

    public setFechaHora(fechaHora : Date){
        this.fechaHora = fechaHora;
    }
}