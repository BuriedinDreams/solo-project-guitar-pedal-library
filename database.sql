-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!



CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (100) UNIQUE NOT NULL,
    "password" VARCHAR (100) NOT NULL
);

-- DROP TABLE "pedal"
-- This is going to keep track of what user created the pedal, the pedal name(s) and the description of said pedal.
CREATE TABLE "pedal" (
	"id" SERIAL PRIMARY KEY,
	"user_id" INT REFERENCES "user",
	"pedal_name" VARCHAR (500) NOT NULL,
	"description_of_pedal" VARCHAR (2000) NOT NULL,	-- this is saving what the user entered as a description for said pedal
	"photo" VARCHAR (2000) NOT NULL -- this is going to save the photos 

);


-- DROP TABLE "youtube_links";
-- This is going to keep track of the youtube_links for individual pedals.
CREATE TABLE "youtube_links" (
	"id" SERIAL PRIMARY KEY,
	"user_id" INT REFERENCES "user",
	"pedal_id" INT REFERENCES "pedal" ON DELETE CASCADE,
	"youtube_links" VARCHAR (2000) NOT NULL,
	"youtube_link_title" VARCHAR (2000) NOT NULL -- add this to edit screen/ add screen

);

--DROP TABLE "likes";
-- This is going to keep track of the number of likes for individual pedals.
CREATE TABLE "likes" (
	"id" SERIAL PRIMARY KEY,
	"user_id" INT REFERENCES "user",
	"pedal_id" INT REFERENCES "pedal" ON DELETE CASCADE,
	UNIQUE ( "user_id", "pedal_id" )
	
);

-- Some Test Data
INSERT INTO "pedal" ("pedal_name", "description_of_pedal", "photo")
VALUES
('The TS9 Tube Screamer Pedal', 'The TS9 Tube Screamer Pedal is an iconic classic for any Blues or Rock N Roll Player. 
The pedal has a characteristic mid-boosted tone popular with blues, rock and metal players.', 'https://media.sweetwater.com/images/items/750/TS9-large.jpg?v=a5b2f4b2a4a1bdee' )
;

INSERT INTO "youtube_links" ("user_id", "pedal_id", "youtube_links", "youtube_link_title")
VALUES ('1', '1', 'https://youtu.be/HvyK6yHShH4' , 'TS9 OverDrive Pedal') 
;