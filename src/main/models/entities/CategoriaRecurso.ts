export class CategoriaRecurso{
    
    constructor (
        private id : number,
        private nombre : string,
        private icono : string,
    )
    {

    }

    public getId() : number{
        return this.id;
    }

    public setId(id : number) : void{
        this.id = id;
    }

    public getNombre (): string{
        return this.nombre;
    }

    public setNombre (nombre: string):void{
        this.nombre = nombre;
    }
}