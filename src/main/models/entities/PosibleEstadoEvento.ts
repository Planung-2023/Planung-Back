export class PosibleEstadoEvento {
    constructor(
        private id: number,
        private nombre: string,
    )

    
    {

    }

    public getId():number{
        return this.id;
    }

    public setId(id: number): void{
        this.id = id;
    }

    public getNombre():string{
        return this.nombre;
    }

    public setNombre(nombre: string): void{
        this.nombre = nombre;
    }
}