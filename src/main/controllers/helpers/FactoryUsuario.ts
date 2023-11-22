import { Usuario } from "../../models/entities/persona/Usuario";
import { FactoryParticipante } from "../../models/factories/FactoryParticipante";
import { FactoryUsuario } from "../../models/factories/FactoryUsuario";
import { Database } from "../../server/Database";

export const factoryUsuario = async (userAuth0: any) => {
    let user = await Database.em.findOne(Usuario, {
        where: {
            email: userAuth0.email,
        },
    });

    if (user === null || user === undefined) {
        user = await FactoryUsuario.crearUsuario({
            auth0Id: userAuth0.sub,
            nombre: userAuth0.given_name,
            apellido: userAuth0.family_name,
            email: userAuth0.email,
            usuario: userAuth0.nickname,
            token: userAuth0.token,
        });

        const participante = await FactoryParticipante.crearParticipante({
            nombre: userAuth0.given_name,
            apellido: userAuth0.family_name,
            email: userAuth0.email,
            usuario: user,
        });

        await Database.em.save(user);
        await Database.em.save(participante);
    } else {
        user.setToken(userAuth0.token);
        await Database.em.save(user);
    }
};
