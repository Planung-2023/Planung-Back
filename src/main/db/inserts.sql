INSERT INTO `ahk_eventos`.`foto_perfil` (`id`, `nombre`) VALUES ('1', 'foto1.jpg');
INSERT INTO `ahk_eventos`.`foto_perfil` (`id`, `nombre`) VALUES ('2', 'foto2.jpg');
INSERT INTO `ahk_eventos`.`foto_perfil` (`id`, `nombre`) VALUES ('3', 'foto3.jpg');
INSERT INTO `ahk_eventos`.`foto_perfil` (`id`, `nombre`) VALUES ('4', 'foto4.jpg');
INSERT INTO `ahk_eventos`.`foto_perfil` (`id`, `nombre`) VALUES ('5', 'foto5.jpg');
INSERT INTO `ahk_eventos`.`foto_perfil` (`id`, `nombre`) VALUES ('6', 'foto6.jpg');
INSERT INTO `ahk_eventos`.`foto_perfil` (`id`, `nombre`) VALUES ('7', 'foto7.jpg');
INSERT INTO `ahk_eventos`.`foto_perfil` (`id`, `nombre`) VALUES ('8', 'foto8.jpg');
INSERT INTO `ahk_eventos`.`foto_perfil` (`id`, `nombre`) VALUES ('9', 'foto9.jpg');

INSERT INTO usuario (id, nombre_usuario, email, foto_perfil_id) VALUES
(1, "Bruno",  "bruno@example.com", 1),
(2, "Tomas", "tomi@example.com", 3),
(3, "Sebastian", "sebas@example.com", 4),
(4, "Matías",  "mati@example.com", 7);


INSERT INTO participante (id, nombre, apellido, mail, usuario_id) VALUES
(1, "Bruno", "Siafas", "brunosiafas@gmail.com", 1),
(2, "Tomas", "Katz", "tomaskatz@gmail.com", 2),
(3, "Sebastian", "Perez", "sebaperez@gmail.com", 3),
(4, "Matías", "De La Cruz López", "matidelacruz@gmail.com", 4);


INSERT INTO rol (id, nombre) VALUES
(1, 'superadmin'),
(2, 'admin'),
(3, 'user');


INSERT INTO ubicacion (id, calle, altura, localidad, latitud, longitud) VALUES 
(1, 'Av. San Martin', 3100, 'C.A.B.A.', 24, 25),
(2, 'Av. Nazca', 2500, 'C.A.B.A.', 30, 30),
(3, 'Av. La Cámpora', 3900, 'Pablo Nogués', 30, 30),
(4, 'Av. 9 de Julio', 50, 'C.A.B.A.', -3, 10);


INSERT INTO evento (id, nombre, fecha, hora_inicio, hora_fin, es_visible, descripcion, tipo_evento, ubicacion_id, evento_anterior_id, presentador_asistente_id, usuario_id, tipo_invitacion) VALUES 
(1, 'Juntada dia del amigo', '2022-04-22', '17:55:00', '23:59:59', 0,"descripcion 1", 'Informal', 1, NULL, NULL, 1, "Directa"),
(2, 'Presentacion inmueble', '2023-12-23','14:05:00', '19:08:09', 1,"descripcion 2", 'Formal', 2, NULL, NULL, 1, "Por aprobacion"),
(3, 'Juntada de Spidermans', '2024-10-29','15:00:00', '18:00:00', 1,"ROMPER RECORD GUINESS", 'Formal', 4, NULL, NULL, 1, "Directa");


INSERT INTO `recurso_categoria` (`icono`, `id`, `nombre`) values ('Bebida', 1, 'Bebida');
INSERT INTO `recurso_categoria` (`icono`, `id`, `nombre`) values ('Mobiliario', 2, 'Mobiliario');
INSERT INTO `recurso_categoria` (`icono`, `id`, `nombre`) values ('Comida', 3, 'Comida');
INSERT INTO `recurso_categoria` (`icono`, `id`, `nombre`) values ('Juego', 4, 'Juego');
INSERT INTO `recurso_categoria` (`icono`, `id`, `nombre`) values ('Tecnologia', 5, 'Tecnologia');
INSERT INTO `recurso_categoria` (`icono`, `id`, `nombre`) values ('Otro', 6, 'Otro');


INSERT INTO recurso (id, nombre, descripcion, cantidad_necesaria, cantidad_actual, proveedor, evento_id, recurso_categoria_id) VALUES 
(1, 'Paty', 'porfavor no traigan marca coto', 4, 4, NULL, 1, 1),
(2, 'Coca Cola', '', 1, 4, NULL, 1, 2),
(3, 'Cargador Notebook HP', 'Que ande, gracias', 1, 4, NULL, 2, 3);


INSERT INTO asistente(id, evento_id, participante_id, rol_id) VALUES
(1, 1, 1, 1),
(2, 1, 2, 2),
(3, 1, 2, 3),
(4, 2, 1, 3),
(5, 2, 2, 3),
(6, 2, 3, 1),
(7, 3, 4, 1);


INSERT INTO asistencia(id, asistente_id) VALUES
(1, 1),
(2, 2),
(3, 3),
(4, 4),
(5, 5),
(6, 6),
(7, 7);


INSERT INTO `ahk_eventos`.`asignacion_recurso` (`id`, `fecha_hora`, `cantidad`, `comentarios`, `recurso_id`, `asistente_id`) VALUES
('1', '2023-10-25 14:00:00', '1', '1', '1', '1');


INSERT INTO `ahk_eventos`.`evento_presentacion` (`idevento_presentacion`, `referencia_archivo`, `nombre`, `evento_id`) VALUES ('1', 'presentador/archivos/Planung_Slides.pdf', 'ejemplo', '1');