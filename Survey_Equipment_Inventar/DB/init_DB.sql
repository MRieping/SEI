CREATE TABLE location
(
	name CHARACTER VARYING(9999) PRIMARY KEY,
	type CHARACTER VARYING(9999) NOT NULL
);

CREATE TABLE aircraft
(
	PRIMARY KEY (name)
) INHERITS(location);

CREATE TABLE storage
(
	PRIMARY KEY (name)
) INHERITS(location);

CREATE TABLE loan
(
	tenant CHARACTER VARYING(9999),
	since CHARACTER VARYING(9999),
	till CHARACTER VARYING(9999),
	number CHARACTER VARYING(9999),
	PRIMARY KEY (name)
) INHERITS(location);

CREATE TABLE product
(
	number CHARACTER VARYING(9999) PRIMARY KEY,
    name CHARACTER VARYING(9999) NOT NULL,
    owner CHARACTER VARYING(9999) NOT NULL,
    elements TEXT NOT NULL,
	serialnr CHARACTER VARYING(9999),
	description TEXT,
	location CHARACTER VARYING(9999) NOT NULL REFERENCES location(name), -- 1-to-n-relation from product to location
	since CHARACTER VARYING(9999),
	type CHARACTER VARYING(9999) NOT NULL
);

CREATE TABLE sensor
(
	measures CHARACTER VARYING(9999),
	productnr CHARACTER VARYING(9999),
	software CHARACTER VARYING(9999),
	firmware CHARACTER VARYING(9999),
	PRIMARY KEY (number)
) INHERITS(product);

CREATE TABLE imu
(
	datarate CHARACTER VARYING(9999),
	PRIMARY KEY (number)
) INHERITS(product);

CREATE TABLE mount
(
	PRIMARY KEY (number)
) INHERITS(product);

CREATE TABLE ccns
(
	PRIMARY KEY (number)
) INHERITS(product);

CREATE TABLE aerocontrol
(
	PRIMARY KEY (number)
) INHERITS(product);

CREATE TABLE cable
(
	length REAL,
	plus CHARACTER VARYING(9999),
	negative CHARACTER VARYING(9999),
	PRIMARY KEY (number)
) INHERITS(product);

CREATE TABLE harddisk
(
	measures CHARACTER VARYING(9999),
	memory CHARACTER VARYING(9999),
	PRIMARY KEY (number)
) INHERITS(product);

CREATE TABLE various
(
	PRIMARY KEY (number)
) INHERITS(product);

CREATE TABLE photos
(
    photo_id SERIAL PRIMARY KEY,
    photo_name TEXT NOT NULL,
    base_64 TEXT NOT NULL,
	fk_number CHARACTER VARYING(9999) NOT NULL -- 1-to-n-relation from product to photos
);

CREATE TABLE possible_locations_for_products -- n-to-n-relation from product to aircraft
(
	fk_number CHARACTER VARYING(9999),
	fk_location CHARACTER VARYING(9999),
	PRIMARY KEY (fk_number, fk_location)
);

CREATE TABLE related_products -- n-to-n-relation from product to itself
(
	fk_rel_number_1 CHARACTER VARYING(9999),
	fk_rel_number_2 CHARACTER VARYING(9999),
	description_for_relation TEXT,
	PRIMARY KEY (fk_rel_number_1, fk_rel_number_2)
);