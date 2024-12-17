CREATE TABLE "todos" (
	"id" SERIAL PRIMARY KEY,
	"name" varchar(225),
	"complete" boolean 
);
INSERT INTO "todos" ( "name" , "complete")
VALUES ( 'read', false);

SELECT * from todos;
UPDATE "todos" set complete =NOT complete WHERE "id"=1;
DELETE FROM "todos" WHERE id=1;