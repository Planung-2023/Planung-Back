INSERT INTO usuario (id, nombre_usuario, contrasenia) VALUES 
(1, "Bruno", "Abc123"),
(2, "Tomas", "Abc123"),
(3, "Sebastian", "Abc123");

INSERT INTO participante (id, nombre, apellido, mail, usuario_id) VALUES
(1, "Bruno", "Siafas", "brunosiafas@gmail.com", 1),
(2, "Tomas", "Katz", "tomaskatz@gmail.com", 2),
(3, "Sebastian", "Perez", "sebaperez@gmail.com", 3);

INSERT INTO rol (id, nombre) VALUES
(1, 'superadmin'),
(2, 'admin'),
(3, 'user');

INSERT INTO ubicacion (id, calle, altura, localidad, latitud, longitud) VALUES 
(1, 'Av. San Martin', 3100, 'C.A.B.A.', 24, 25),
(2, 'Av. Nazca', 2500, 'C.A.B.A.', 30, 30);

INSERT INTO evento (id, nombre, fecha_hora, es_visible, tipo_evento, ubicacion_id, evento_anterior_id, presentador_asistente_id) VALUES 
(1, 'Juntada dia del amigo', '2022-04-22', 0, 'Informal', 1, NULL, NULL),
(2, 'Presentacion inmueble', '2022-04-23', 1, 'Formal', 2, NULL, NULL);

INSERT INTO recurso_categoria (id, nombre, icono) VALUES 
(1, 'Comida', 'jpg'),
(2, 'Bebida', 'jpg'),
(3, 'Tecnologia', 'jpg'),
(4, 'Otro', 'jpg');

INSERT INTO recurso (id, nombre, descripcion, cantidad, proveedor, evento_id, recurso_categoria_id) VALUES 
(1, 'Paty', 'porfavor no traigan marca coto', 2, NULL, 1, 1),
(2, 'Coca Cola', '', 1, NULL, 1, 2),
(3, 'Cargador Notebook HP', 'Que ande, gracias', 1, NULL, 2, 3);

INSERT INTO asistente(id, evento_id, participante_id, rol_id) VALUES
(1, 1, 1, 1),
(2, 1, 2, 2),
(3, 1, 2, 3),
(4, 2, 1, 3),
(5, 2, 2, 3),
(6, 2, 3, 1);


INSERT INTO asistencia(id, asistente_id) VALUES
(1, 1),
(2, 2),
(3, 3),
(4, 4),
(5, 5),
(6, 6);