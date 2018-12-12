/*(disconnect db ->) open query tool with another db -> close all open connections to db in one step*/

	SELECT
	 *
	FROM
	 pg_stat_activity
	WHERE
	 datname = 'survey_equipment_inventar';
	 
	SELECT
	 pg_terminate_backend (pg_stat_activity.pid)
	FROM
	 pg_stat_activity
	WHERE
	 pg_stat_activity.datname = 'survey_equipment_inventar';
	
/*-> drop db in another step*/

	DROP DATABASE survey_equipment_inventar;

/*
create db in one step*/

CREATE DATABASE survey_equipment_inventar
    WITH 
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'German_Germany.1252'
    LC_CTYPE = 'German_Germany.1252'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1;
