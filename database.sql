-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!



CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (100) UNIQUE NOT NULL,
    "password" VARCHAR (100) NOT NULL
);


-- This is going to keep track of what user created the pedal, the pedal name(s) and the description of said pedal.
CREATE TABLE "pedal" (
	"id" SERIAL PRIMARY KEY,
	"user_id" INT REFERENCES "user",
	"pedal_name" VARCHAR (500) NOT NULL,
	"description_of_pedal" VARCHAR (2000) NOT NULL	-- this is saving what the user entered as a description for said pedal 

);

-- This is going to keep track of the comments for individual pedals && what user said as a comment.
CREATE TABLE "comments" (
	"id" SERIAL PRIMARY KEY,
	"user_id" INT REFERENCES "user",
	"pedal_id" INT REFERENCES "pedal",
	"comments" VARCHAR (2000) NOT NULL -- this is saving what the user said as a comment. 	
	
);

-- This is going to keep track of the youtube_links for individual pedals.
CREATE TABLE "youtube_links" (
	"id" SERIAL PRIMARY KEY,
	"user_id" INT REFERENCES "user",
	"pedal_id" INT REFERENCES "pedal",
	"youtube_links" VARCHAR (2000) NOT NULL,
	"youtube_link_title" VARCHAR (2000) NOT NULL -- add this to edit screen/ add screen

);

-- This is going to keep track of the number of likes for individual pedals.
CREATE TABLE "likes" (
	"id" SERIAL PRIMARY KEY,
	"user_id" INT REFERENCES "user",
	"pedal_id" INT REFERENCES "pedal"
	
);

-- DROP TABLE "photos";
-- This is going to keep track of the images for individual pedals.
CREATE TABLE "photos" (
	"id" SERIAL PRIMARY KEY,
	"user_id" INT REFERENCES "user",
	"pedal_id" INT REFERENCES "pedal",
	"photo" VARCHAR (2000) NOT NULL -- this is going to save the photos 
);


-- dummy data
INSERT INTO "photos" ("photo")
VALUES (' https://img.audiofanzine.com/images/u/product/normal/ibanez-ts9-tube-screamer-6368.jpg '), 
(' https://media.musiciansfriend.com/is/image/MMGS7/Limited-Edition-Blue-Hippo-Analog-Chorus-Guitar-Effects-Pedal/J19633000000000-00-1600x1600.jpg ')
;

INSERT INTO "pedal" ("pedal_name"), ("pedal_description")
VALUES('TS9 Tube Screamer', 'The Ibanez Tube Screamer is a guitar overdrive pedal, made by Ibanez. The pedal has a characteristic mid-boosted tone popular with blues, rock and metal players. ')


SELECT count("likes".pedal_id) as "Likes", "photos".photo, "pedal".pedal_name, "pedal".description_of_pedal, "pedal".id
FROM "photos"
JOIN "pedal" on "pedal".id = "photos".pedal_id
JOIN "likes" on "likes".pedal_id = "pedal".id
GROUP BY "pedal".id, "photos".id
 ;


SELECT "pedal".id, "photos".photo, "pedal".pedal_name, 
"pedal".description_of_pedal
FROM "photos"
JOIN "pedal" on "pedal".id = "photos".pedal_id
JOIN "likes" on "likes".pedal_id = "pedal".id
WHERE "pedal".id = 1
 ;



INSERT INTO "youtube_links" ("user_id", "pedal_id", "youtube_links", "youtube_link_title")
VALUES ('1', '1', 'https://www.youtube.com/watch?v=kDEetp4snpM', 'TS9 Tube Screamer Pedal' ), 
('1', '2', 'https://www.youtube.com/watch?v=EXagKYVUzzM', 'Blue Hippo Chrous Pedal' )
;

SELECT * FROM "youtube_links"

;


