import { NextFunction, Request, Response } from "express";
import { AsignacionRecurso } from "../../../models/entities/recursos/AsignacionRecurso";
import { CategoriaRecurso } from "../../../models/entities/recursos/CategoriaRecurso";
import { Recurso } from "../../../models/entities/recursos/Recurso";
import { Database } from "../../../server/Database";
import { EventosApiController } from "../eventos/EventosApiController";

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

            const evento = await EventosApiController.findOneById(id);

            if( !evento ) {
                res.status(404).json({
                    msg: `Evento con id ${id} no encontrado`
                }).send();
            }

            const recursosInsertados = await RecursosApiController.crearRecursos(recursos, id)

            res.status(201).json({ recursos: recursosInsertados }).send();
        }
        catch (e) {
            next(e);
        }
    }

    public static async update(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const { recursos } = req.body;
            
            const evento = await EventosApiController.findOneById(id);
			if (!evento) {
				res.status(404).json({
					msg: `Evento con id ${id} no encontrado`,
				}).send();
            }
            
            const recursosNuevos = recursos.filter((recurso: Recurso) => !recurso.id);
            await RecursosApiController.crearRecursos(recursosNuevos, id);
            
            const recursosExistentes = await Database.em.findBy(Recurso, { evento: { id } });
			const recursosNoEnviados = recursosExistentes.filter((recursoExistente: Recurso) => {
					return (
						recursoExistente.id !== null &&
						!recursos.some((recurso: Recurso) => recurso.id === recursoExistente.id)
					);
				}
            );
            
			await Database.em.remove(recursosNoEnviados);

            const recursosAModificar = recursosExistentes.filter(
				(recursoExistente: Recurso) => {
					return (
						recursoExistente.id !== null &&
						recursos.some((recurso: Recurso) =>recurso.id === recursoExistente.id)
					);
				}
            );
            
            await RecursosApiController.actualizarRecursos(recursosAModificar, recursos);
            
            const recursosInsertados = await Database.em.findBy(Recurso, {
                evento: { id }
            })

            res.status(200).json({
                recursos: recursosInsertados,
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
	public static async getCategorias(req: Request, res: Response, next: NextFunction){
        try {
            const recurso = await Database.em.findOneBy(Recurso, {
                id: req.params.id
            });

            if(!recurso) {
                res.status(404).json({ msg: "Recurso no encontrado" }).send();
                return;
            }
            const categoria = await Database.em.findOneBy(CategoriaRecurso, {
                recursos: {},
            });
            res.json({
                categoria
            }).send();
        }
        catch (e) {
            next(e);
        }    
        

    }

    public static async getTodasLasCategorias(req: Request, res: Response, next: NextFunction){
        try {
    
            const categorias = await Database.em.find(CategoriaRecurso);
            res.json({
                categorias
            }).send();
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
        recurso.setCantidadNecesaria(params.cantidad);
        recurso.setCantidadActual(params.cantidad);
        recurso.setCategoria(params.categoria);
        recurso.setProveedor(params.proveedor ? params.proveedor : null);
    }

    private static async crearRecursos(recursos: any[], idEvento: string) {
        const recursosInsertados: Recurso[] = [];
        for (const recursoData of recursos) {
            const recurso = new Recurso();
            recursoData.evento = idEvento;

            const existeCategoria = await Database.em.findOneBy(CategoriaRecurso,
                { id: recursoData.categoria }
            )

            if (existeCategoria != null) {
                RecursosApiController.asignarParametros(recurso!!, recursoData);
                await Database.em.save(recurso);

                recursosInsertados.push(recurso);
            }
        }

        return recursosInsertados;
    }

    private static async actualizarRecursos(recursosAModificar: any[], recursos: any[]) {
        for (const recursoExistente of recursosAModificar) {
            const recursoData = recursos.find((recurso: Recurso) => recurso.id === recursoExistente.id);
            
			if (recursoData) {
				RecursosApiController.asignarParametros(
					recursoExistente,
					recursoData
				);
				await Database.em.save(recursoExistente);
			}
		}
    }
}
