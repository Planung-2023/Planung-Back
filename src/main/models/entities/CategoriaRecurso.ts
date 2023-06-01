

export class CategoriaRecurso{

    private id : number;
    private nombre : string;
    private icono : string; 
    
    constructor (id: number, nombre: string, icono: string) 
      {
        this.id = 1;
        this.nombre = "Juan";
        this.icono = "Icono";
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