INSERT INTO storage (name, type) VALUES 
	('Hangar', 'storage'), 
	('Office', 'storage'),
	('Hangar2', 'storage');

INSERT INTO aircraft (name, type) VALUES 
	('ITOL', 'aircraft'), 
	('ELYK', 'aircraft'),
	('IWAW', 'aircraft');

INSERT INTO sensor (number, name, owner, elements, serialnr, description, location, since, type, measures, productnr, software, firmware) VALUES 
	('042', 'Analog Cam 42', 'Weser AS', 'UCEagle', '04273', 'old camera', 'Office', '2018-11-29', 'Sensor', '20 x 30 x 20 cm', 07342, 'no software', 'no firmware'),
	('073', 'Digital Cam 73', 'Weser AS', 'UCEagle', '14273', 'new camera', 'ITOL', '2018-11-29', 'Sensor', '10 x 50 x 20 cm', 17342, 'best software', 'best software'),
	('001', 'Cam 001', 'Weser AS', 'UCEagle', '', '', 'ELYK', '', 'Sensor', '', 14273, '', ''),
	('002', 'Cam 002', 'AVT', 'UCEagle', '', '', 'ITOL',  '2018-11-29', 'Sensor', '0.5 x 0.2 m', '', '', ''),
	('005', 'Cam 005', 'Weser AS', 'UCEagle', '', '', 'IWAW', '2018-11-29', 'Sensor', '', '', '', '');
	
INSERT INTO harddisk (number, name, owner, elements, serialnr, description, location, since, type, measures, memory) VALUES
	('142', 'HDD_042', 'Weser AS', 'UCEagle', '', 'old HDD', 'Office', '2018-11-29', 'Harddisk', '20 x 10 cm', '10 TB'),
	('172', 'SSD_072', 'AVT', 'UCEagle', '', 'new SSD', 'ITOL', '2018-11-29', 'Harddisk', '', '20 TB');
	
INSERT INTO possible_locations_for_products(fk_location, fk_number) VALUES
	('ITOL', '001'),
	('IWAW', '001'),
	('Office', '001'),
	('Hangar', '001'),
	('ITOL', '002'),
	('IWAW', '002'),
	('ELYK', '002'),
	('Office', '002'),
	('Hangar', '002');
	
INSERT INTO related_products(fk_rel_number_1, fk_rel_number_2, description_for_relation) VALUES
	('001', '142', 'sometimes with connection problems');