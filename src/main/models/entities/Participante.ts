import { Usuario } from "./Usuario";

export class Participante {
    constructor(
       private id: number,
       private usuario: Usuario,
       private nombre: string,
       private apellido: string,
       private mail: string,
    )
    {

    }

    public getId():number{
        return this.id;
    }

    public setId(id: number): void{
        this.id = id;
    }
    
    public getUsuario(): Usuario{
        return this.usuario; 
    }

    public setUsuario(usuario: Usuario):void{
        this.usuario = usuario
    }

    public getNombre(): string{
        return this.nombre;
    }

    public setNombre(nombre: string):void{
        this.nombre;
    }

    public getApellido(): string{
        return this.apellido;
    }

    public setApellido(apellido: string):void{
        this.apellido = apellido;
    }

    public getMail():string{
        return this.mail;
    }

    public setMail(mail:string):void{
        this.mail = mail;
    }
}