import { NextFunction, Request, Response } from "express";
import { Evento } from "../../../models/entities/evento/Evento";
import { AsignacionRecurso } from "../../../models/entities/recursos/AsignacionRecurso";
import { CategoriaRecurso } from "../../../models/entities/recursos/CategoriaRecurso";
import { Recurso } from "../../../models/entities/recursos/Recurso";
import { Database } from "../../../server/Database";

export class RecursosApiController {

    public static async index(req: Request, res: Response, next: NextFunction) {
        try {
            const idEvento = req.params.id;

            const recursos = await Database.em.find(Recurso, { where: {
                evento: {
                    id: idEvento
                }
            }});
            res.json(recursos);
        }
        catch (e) {
            next(e);
        }
    }
    
    public static async show(req: Request, res: Response, next: NextFunction) {
        try {
            const recurso = await Database.em.findOneBy(Recurso, {
                id: req.params.id
            });

            if(recurso === null) {
                res.status(404);
                res.send();
                return;
            }
            res.json(recurso);
        }
        catch (e) {
            next(e);
        }
    }
    
    public static async store(req: Request, res: Response, next: NextFunction) {
        try {

            const { recursos } = req.body;
            const { id } = req.params;

            console.log("id: ", id)
            const existeEvento = await Database.em.exists(Evento, {
                where: {
                    id: id
                }
            })

            if(!existeEvento) {
                res.status(404).json({
                    msg: `Evento con id ${id} no encontrado`
                }).send();
            }
            const recursosInsertados: Recurso[]=[];


            for (const recursoData of recursos){
                const recurso = new Recurso()
                recursoData.evento = id;
                const existeCategoria = await Database.em.findOneBy(CategoriaRecurso, { id: recursoData.categoria });

                if(existeCategoria != null) {
                    RecursosApiController.asignarParametros(recurso!!, recursoData);
                    await Database.em.save(recurso);
                    recursosInsertados.push(recurso);
                }
            }

            res.status(201).json({
                recursos: recursosInsertados
            });

            res.send();
        }
        catch (e) {
            next(e);
        }
    }

    public static async update(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const { recursos } = req.body;
            
            const evento = await Database.em.findOneBy(Evento, {
                id
            });
            if(evento === null) {
                res.status(404).json({
                    msg: `Evento con id ${id} no existe`
                }).send();
            }

            const recursosExistentes = await Database.em.findBy(Recurso, { evento: { id } });   
            const recursosNoEnviados = recursosExistentes.filter((recursoExistente: Recurso) => {
                return recursoExistente.id !== null && !recursos.some((recurso: Recurso) => recurso.id === recursoExistente.id)
            })
            await Database.em.remove(recursosNoEnviados);
            
            const recursosNuevos = recursos.filter((recurso: Recurso) => !recurso.id);
            for (const recursoData of recursosNuevos) {
                const recurso = new Recurso();
                recursoData.evento = id;

                const existeCategoria = await Database.em.findOneBy(CategoriaRecurso,
					{ id: recursoData.categoria }
				);

				if (existeCategoria != null) {
					RecursosApiController.asignarParametros(
						recurso!!,
						recursoData
					);
					await Database.em.save(recurso);
				}
            }

            const nuevosRecursos = await Database.em.findBy(Recurso, {
                evento: { id }
            })

            res.status(200).json({
                nuevosRecursos
            }).send();
        }
        catch (e) {
            next(e);
        }
    }

    public static async remove(req: Request, res: Response, next: NextFunction) {
        try {
            const recurso = await Database.em.findOneBy(Recurso, {
                id: req.params.id
            });

            if(recurso === null) {
                res.status(404);
                res.send();
                return;
            }

            await Database.em.remove(recurso);
            res.status(200);
            res.send();
        }
        catch (e) {
            next(e);
        }
    }

    public static async getAsignaciones(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;

            const recurso = await Database.em.findOneBy(Recurso, {
                id
            });

            if (!recurso) res.status(404).send();

            const asignaciones = await Database.em.findBy(AsignacionRecurso, {
                recurso: { id },
            })
            
            res.json({
                asignaciones,
            });
        } catch (e) {
            next(e)
        }
    }

    private static asignarParametros(recurso: Recurso, params: any) {
        recurso.setNombre(params.nombre);
        recurso.setEvento(params.evento);
        recurso.setDescripcion(params.descripcion);
        recurso.setCantidad(params.cantidad);
        recurso.setCategoria(params.categoria);
        recurso.setProveedor(params.proveedor ? params.proveedor : null);
    }
}