USE guardian;

CREATE TABLE users(
	id bigint PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(180) NOT NULL UNIQUE,
    name VARCHAR(90) NOT NULL,
    lastname VARCHAR(90) NOT NULL,
    phone VARCHAR(90) NOT NULL,
    password VARCHAR(90) NOT NULL,
    created_at TIMESTAMP(0) NOT NULL,
	updated_at TIMESTAMP(0) NOT NULL
);


CREATE TABLE roles(
	id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(90) NOT NULL UNIQUE,
    image VARCHAR(255) NULL,
    route VARCHAR(180) NOT NULL,
    created_at TIMESTAMP (0) NOT NULL,
    updated_at TIMESTAMP (0) NOT NULL
);

INSERT INTO roles(
	name,
    route,
    created_at,
    updated_at
)
VALUES(
	'ADMINISTRADOR',
    '/administrador/tablas',
    '2024-03-30',
    '2024-03-30'
);

INSERT INTO roles(
	name,
    route,
    created_at,
    updated_at
)
VALUES(
	'GUARDA',
    '/guarda/tablas',
    '2024-03-30',
    '2024-03-30'
);

CREATE TABLE user_has_roles(
	id_user BIGINT NOT NULL,
    id_rol BIGINT NOT NULL,
    created_at TIMESTAMP (0) NOT NULL,
    updated_at TIMESTAMP (0) NOT NULL,
    FOREIGN KEY(id_user) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY(id_rol) REFERENCES roles(id) ON UPDATE CASCADE ON DELETE CASCADE,
    PRIMARY KEY(id_user, id_rol)
);


CREATE TABLE registros (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(180) NOT NULL,
    lastname VARCHAR(180) NOT NULL,
    telefono VARCHAR(180) NOT NULL,
    tipoDocumento VARCHAR(180) NOT NULL,
    documento VARCHAR(180) NOT NULL UNIQUE,
    dispositivo VARCHAR(180) NOT NULL,
    marca VARCHAR(180) NOT NULL,
    color VARCHAR(180) NOT NULL,
    serial VARCHAR(180) NOT NULL UNIQUE,
    descripcion TEXT NOT NULL,
    created_at TIMESTAMP (0) CURRENT_TIMESTAMP,
    updated_at TIMESTAMP (0) CURRENT_TIMESTAMP
)