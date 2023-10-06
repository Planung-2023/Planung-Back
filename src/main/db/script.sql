-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema ahk_eventos
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema ahk_eventos
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `ahk_eventos` DEFAULT CHARACTER SET utf8 ;
USE `ahk_eventos` ;

-- -----------------------------------------------------
-- Table `ahk_eventos`.`rol`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ahk_eventos`.`rol` ;

CREATE TABLE IF NOT EXISTS `ahk_eventos`.`rol` (
  `id` VARCHAR(255) NOT NULL,
  `nombre` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `ahk_eventos`.`usuario`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ahk_eventos`.`usuario` ;

CREATE TABLE IF NOT EXISTS `ahk_eventos`.`usuario` (
  `id` VARCHAR(255) NOT NULL,
  `nombre_usuario` VARCHAR(255) NOT NULL,
  `contrasenia` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `ahk_eventos`.`participante`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ahk_eventos`.`participante` ;

CREATE TABLE IF NOT EXISTS `ahk_eventos`.`participante` (
  `id` VARCHAR(255) NOT NULL,
  `nombre` VARCHAR(255) NOT NULL,
  `apellido` VARCHAR(255) NOT NULL,
  `mail` VARCHAR(255) NOT NULL,
  `usuario_id` VARCHAR(255) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `REL_936a1c0dc1a093f3df9210f2ed` (`usuario_id` ASC),
  CONSTRAINT `FK_936a1c0dc1a093f3df9210f2ed8`
    FOREIGN KEY (`usuario_id`)
    REFERENCES `ahk_eventos`.`usuario` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `ahk_eventos`.`ubicacion`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ahk_eventos`.`ubicacion` ;

CREATE TABLE IF NOT EXISTS `ahk_eventos`.`ubicacion` (
  `id` VARCHAR(255) NOT NULL,
  `calle` VARCHAR(255) NOT NULL,
  `altura` INT(11) NOT NULL,
  `localidad` VARCHAR(255) NOT NULL,
  `latitud` FLOAT NULL DEFAULT NULL,
  `longitud` FLOAT NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `ahk_eventos`.`evento`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ahk_eventos`.`evento` ;

CREATE TABLE IF NOT EXISTS `ahk_eventos`.`evento` (
  `id` VARCHAR(255) NOT NULL,
  `nombre` VARCHAR(255) NOT NULL,
  `fecha_hora` DATE NOT NULL,
  `es_visible` TINYINT(4) NOT NULL,
  `tipo_evento` VARCHAR(255) NOT NULL,
  `ubicacion_id` VARCHAR(255) NULL DEFAULT NULL,
  `evento_anterior_id` VARCHAR(255) NULL DEFAULT NULL,
  `presentador_asistente_id` VARCHAR(255) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `REL_d57567d22b391cf7a59fe22f25` (`ubicacion_id` ASC),
  UNIQUE INDEX `REL_1ac976981a5cd94d8b7ab89839` (`evento_anterior_id` ASC),
  UNIQUE INDEX `REL_9938f2199b5f1b5c385dbf5a73` (`presentador_asistente_id` ASC),
  CONSTRAINT `FK_1ac976981a5cd94d8b7ab898394`
    FOREIGN KEY (`evento_anterior_id`)
    REFERENCES `ahk_eventos`.`evento` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `FK_9938f2199b5f1b5c385dbf5a737`
    FOREIGN KEY (`presentador_asistente_id`)
    REFERENCES `ahk_eventos`.`asistente` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `FK_d57567d22b391cf7a59fe22f256`
    FOREIGN KEY (`ubicacion_id`)
    REFERENCES `ahk_eventos`.`ubicacion` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `ahk_eventos`.`asistente`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ahk_eventos`.`asistente` ;

CREATE TABLE IF NOT EXISTS `ahk_eventos`.`asistente` (
  `id` VARCHAR(255) NOT NULL,
  `evento_id` VARCHAR(255) NULL DEFAULT NULL,
  `participante_id` VARCHAR(255) NULL DEFAULT NULL,
  `rol_id` VARCHAR(255) NULL DEFAULT NULL,
  `asistencia_id` VARCHAR(255) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `REL_2e287b666c7f9b1fa82afda05e` (`asistencia_id` ASC),
  INDEX `FK_b7f898b7c4291c899b2b8597ae0` (`evento_id` ASC),
  INDEX `FK_a2b07c0f68ac3ae38ea202e3df3` (`participante_id` ASC),
  INDEX `FK_8ef251d9bea7d45f43f60702f52` (`rol_id` ASC),
  CONSTRAINT `FK_2e287b666c7f9b1fa82afda05e2`
    FOREIGN KEY (`asistencia_id`)
    REFERENCES `ahk_eventos`.`asistencia` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `FK_8ef251d9bea7d45f43f60702f52`
    FOREIGN KEY (`rol_id`)
    REFERENCES `ahk_eventos`.`rol` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `FK_a2b07c0f68ac3ae38ea202e3df3`
    FOREIGN KEY (`participante_id`)
    REFERENCES `ahk_eventos`.`participante` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `FK_b7f898b7c4291c899b2b8597ae0`
    FOREIGN KEY (`evento_id`)
    REFERENCES `ahk_eventos`.`evento` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `ahk_eventos`.`asistencia`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ahk_eventos`.`asistencia` ;

CREATE TABLE IF NOT EXISTS `ahk_eventos`.`asistencia` (
  `id` VARCHAR(255) NOT NULL,
  `fecha_hora` DATE NOT NULL,
  `asistente_id` VARCHAR(255) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `REL_33d3b126b4643fc41bdafb897f` (`asistente_id` ASC),
  CONSTRAINT `FK_33d3b126b4643fc41bdafb897f5`
    FOREIGN KEY (`asistente_id`)
    REFERENCES `ahk_eventos`.`asistente` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `ahk_eventos`.`notificacion`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ahk_eventos`.`notificacion` ;

CREATE TABLE IF NOT EXISTS `ahk_eventos`.`notificacion` (
  `id` VARCHAR(255) NOT NULL,
  `fecha_hora` DATE NOT NULL,
  `mensaje` TEXT NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `ahk_eventos`.`asistente_notificacion`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ahk_eventos`.`asistente_notificacion` ;

CREATE TABLE IF NOT EXISTS `ahk_eventos`.`asistente_notificacion` (
  `id` VARCHAR(255) NOT NULL,
  `visto` TINYINT(4) NOT NULL,
  `fechaVisto` DATE NULL DEFAULT NULL,
  `notificacion_id` VARCHAR(255) NULL DEFAULT NULL,
  `asistente_id` VARCHAR(255) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `FK_3307bb82de62131a67adeffd913` (`notificacion_id` ASC),
  INDEX `FK_941322bbcd9c0a91be49da40772` (`asistente_id` ASC),
  CONSTRAINT `FK_3307bb82de62131a67adeffd913`
    FOREIGN KEY (`notificacion_id`)
    REFERENCES `ahk_eventos`.`notificacion` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `FK_941322bbcd9c0a91be49da40772`
    FOREIGN KEY (`asistente_id`)
    REFERENCES `ahk_eventos`.`asistente` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `ahk_eventos`.`posible_estado_evento`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ahk_eventos`.`posible_estado_evento` ;

CREATE TABLE IF NOT EXISTS `ahk_eventos`.`posible_estado_evento` (
  `id` VARCHAR(255) NOT NULL,
  `nombre` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `ahk_eventos`.`estado_evento`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ahk_eventos`.`estado_evento` ;

CREATE TABLE IF NOT EXISTS `ahk_eventos`.`estado_evento` (
  `id` VARCHAR(255) NOT NULL,
  `fecha_hora` DATE NOT NULL,
  `evento_id` VARCHAR(255) NULL DEFAULT NULL,
  `posible_estado_evento_id` VARCHAR(255) NULL DEFAULT NULL,
  `asistente_cambio_estado_id` VARCHAR(255) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `FK_14838505b0915594e755c6d04c4` (`evento_id` ASC),
  INDEX `FK_684aa405b73aea330a1f0224816` (`posible_estado_evento_id` ASC),
  INDEX `FK_5af8c3499214516a6ba703d53ab` (`asistente_cambio_estado_id` ASC),
  CONSTRAINT `FK_14838505b0915594e755c6d04c4`
    FOREIGN KEY (`evento_id`)
    REFERENCES `ahk_eventos`.`evento` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `FK_5af8c3499214516a6ba703d53ab`
    FOREIGN KEY (`asistente_cambio_estado_id`)
    REFERENCES `ahk_eventos`.`asistente` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `FK_684aa405b73aea330a1f0224816`
    FOREIGN KEY (`posible_estado_evento_id`)
    REFERENCES `ahk_eventos`.`posible_estado_evento` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `ahk_eventos`.`invitacion`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ahk_eventos`.`invitacion` ;

CREATE TABLE IF NOT EXISTS `ahk_eventos`.`invitacion` (
  `id` VARCHAR(255) NOT NULL,
  `fecha_hora_envio` DATE NOT NULL,
  `fecha_hora_visto` DATE NULL DEFAULT NULL,
  `fecha_hora_respuesta` DATE NOT NULL,
  `esta_visto` TINYINT(4) NULL DEFAULT NULL,
  `esta_aceptado` TINYINT(4) NOT NULL,
  `asistente_id` VARCHAR(255) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `REL_84ddf14bfa2c1dfabcacd75091` (`asistente_id` ASC),
  CONSTRAINT `FK_84ddf14bfa2c1dfabcacd750916`
    FOREIGN KEY (`asistente_id`)
    REFERENCES `ahk_eventos`.`asistente` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `ahk_eventos`.`permiso`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ahk_eventos`.`permiso` ;

CREATE TABLE IF NOT EXISTS `ahk_eventos`.`permiso` (
  `id` VARCHAR(255) NOT NULL,
  `nombre` VARCHAR(255) NOT NULL,
  `descripcion` VARCHAR(255) NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `ahk_eventos`.`posible_estado_recurso`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ahk_eventos`.`posible_estado_recurso` ;

CREATE TABLE IF NOT EXISTS `ahk_eventos`.`posible_estado_recurso` (
  `id` VARCHAR(255) NOT NULL,
  `nombre` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `ahk_eventos`.`recurso_categoria`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ahk_eventos`.`recurso_categoria` ;

CREATE TABLE IF NOT EXISTS `ahk_eventos`.`recurso_categoria` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(255) NOT NULL,
  `icono` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 5
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `ahk_eventos`.`recurso`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ahk_eventos`.`recurso` ;

CREATE TABLE IF NOT EXISTS `ahk_eventos`.`recurso` (
  `id` VARCHAR(255) NOT NULL,
  `nombre` VARCHAR(255) NOT NULL,
  `descripcion` VARCHAR(255) NOT NULL,
  `cantidad` INT(11) NOT NULL,
  `proveedor` VARCHAR(255) NULL DEFAULT NULL,
  `evento_id` VARCHAR(255) NULL DEFAULT NULL,
  `recurso_categoria_id` INT(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `FK_3ebb119f980d0399b6f2b28d0f7` (`evento_id` ASC),
  INDEX `FK_eac65bb1f8558a5c59449d792c2` (`recurso_categoria_id` ASC),
  CONSTRAINT `FK_3ebb119f980d0399b6f2b28d0f7`
    FOREIGN KEY (`evento_id`)
    REFERENCES `ahk_eventos`.`evento` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `FK_eac65bb1f8558a5c59449d792c2`
    FOREIGN KEY (`recurso_categoria_id`)
    REFERENCES `ahk_eventos`.`recurso_categoria` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `ahk_eventos`.`recurso_estado`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ahk_eventos`.`recurso_estado` ;

CREATE TABLE IF NOT EXISTS `ahk_eventos`.`recurso_estado` (
  `id` VARCHAR(255) NOT NULL,
  `fecha_hora` DATE NOT NULL,
  `posible_estado_recurso_id` VARCHAR(255) NULL DEFAULT NULL,
  `recurso_id` VARCHAR(255) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `FK_d2796424a4fe5e66c7a8b1f622f` (`posible_estado_recurso_id` ASC),
  INDEX `FK_a6ff01be4c97fd6d06f117f65ae` (`recurso_id` ASC),
  CONSTRAINT `FK_a6ff01be4c97fd6d06f117f65ae`
    FOREIGN KEY (`recurso_id`)
    REFERENCES `ahk_eventos`.`recurso` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `FK_d2796424a4fe5e66c7a8b1f622f`
    FOREIGN KEY (`posible_estado_recurso_id`)
    REFERENCES `ahk_eventos`.`posible_estado_recurso` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `ahk_eventos`.`rol_permiso`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ahk_eventos`.`rol_permiso` ;

CREATE TABLE IF NOT EXISTS `ahk_eventos`.`rol_permiso` (
  `permiso_id` VARCHAR(255) NOT NULL,
  `rol_id` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`permiso_id`, `rol_id`),
  INDEX `IDX_3c476728351cd2f8f875ceb32e` (`permiso_id` ASC),
  INDEX `IDX_c59b6b0fee02257a3e1ca75c47` (`rol_id` ASC),
  CONSTRAINT `FK_3c476728351cd2f8f875ceb32ee`
    FOREIGN KEY (`permiso_id`)
    REFERENCES `ahk_eventos`.`permiso` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `FK_c59b6b0fee02257a3e1ca75c47b`
    FOREIGN KEY (`rol_id`)
    REFERENCES `ahk_eventos`.`rol` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
