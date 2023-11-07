import { Usuario } from "../entities/persona/Usuario";
import { Database } from "../../server/Database";
import { FotoPerfil } from "../entities/persona/FotoPerfil";

export class FactoryUsuario {

    public static async crearUsuario(parametros: any) {
        const usuario = new Usuario();

        const fotoPorDefecto = await Database.em.findOneBy(FotoPerfil, {id: 1});
        usuario.setFotoPerfil(fotoPorDefecto);

        if(parametros.auth0Id !== undefined) {
            usuario.idAuth0 = parametros.auth0Id;
        }

        if(parametros.nombre !== undefined) {
            usuario.nombre = parametros.nombre;
        }

        if(parametros.apellido !== undefined) {
            usuario.apellido = parametros.apellido;
        }

        usuario.email = parametros.email;

        if(parametros.usuario !== undefined) {
            usuario.nombreUsuario = parametros.usuario;
        }

        return usuario;
    }
}
