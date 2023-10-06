

INSERT INTO usuario (nombre_usuario, contrasenia) VALUES 
("Bruno", "Abc123"),
("Tomas", "Abc123"),
("Sebastian", "Abc123");

INSERT INTO participante (nombre, apellido, mail, usuario_id) VALUES
("Bruno", "Siafas", "brunosiafas@gmail.com", 1)
("Tomas", "Katz", "tomaskatz@gmail.com", 2)
("Sebastian", "Perez", "sebaperez@gmail.com", 3);


INSERT INTO ubicacion (id, calle, altura, localidad, latitud, longitud) VALUES 
(1, 'Av. San Martin', 3100, 'C.A.B.A.', 24, 25),
(2, 'Av. Nazca', 2500, 'C.A.B.A.', 30, 30);

INSERT INTO evento (id, nombre, fecha_hora, es_visible, tipo_evento, ubicacion_id, evento_anterior_id, presentador_asistente_id) VALUES 
(1, 'Juntada dia del amigo', '2022-04-22', 0, 'Informal', '1', NULL, NULL),
(2, 'Presentacion inmueble', '2022-04-23', 1, 'Formal', '2', NULL, NULL);


INSERT INTO recurso_categoria (id, nombre, icono) VALUES 
(1, 'Comida', 'jpg'),
(2, 'Bebida', 'jpg'),
(3, 'Otro', 'jpg');


INSERT INTO recurso (id, nombre, descripcion, cantidad, proveedor, evento_id, recurso_categoria_id) VALUES 
(1, 'Paty', 'porfavor no traigan marca coto', 2, NULL, '1', 1),
(2, 'Coca Cola', '', 1, NULL, '1', 2),
(3, 'Cargador Notebook HP', 'Que ande, gracias', 1, NULL, '2', 3);

