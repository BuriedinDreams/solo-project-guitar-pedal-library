-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!



CREATE TABLE "user" (
"id" SERIAL PRIMARY KEY,
"username" VARCHAR (100) UNIQUE NOT NULL,
"password" VARCHAR (100) NOT NULL
);

-- DROP TABLE "pedal" cascade ;
-- This is going to keep track of what user created the pedal, the pedal name(s) and the description of said pedal.
CREATE TABLE "pedal" (
"id" SERIAL PRIMARY KEY,
"user_id" INT REFERENCES "user",
"pedal_name" VARCHAR (500) NOT NULL,
"description_of_pedal" VARCHAR (2000) NOT NULL,	-- this is saving what the user entered as a description for said pedal
"photo" VARCHAR (2000) NOT NULL -- this is going to save the photos 

);

-- DROP TABLE "comments";
-- This is going to keep track of the comments for individual pedals && what user said as a comment.
CREATE TABLE "comments" (
"id" SERIAL PRIMARY KEY,
"user_id" INT REFERENCES "user",
"pedal_id" INT REFERENCES "pedal",
"comments" VARCHAR (2000) NOT NULL -- this is saving what the user said as a comment. 	

);
-- DROP TABLE "youtube_links";
-- This is going to keep track of the youtube_links for individual pedals.
CREATE TABLE "youtube_links" (
"id" SERIAL PRIMARY KEY,
"user_id" INT REFERENCES "user",
"pedal_id" INT REFERENCES "pedal",
"youtube_links" VARCHAR (2000) NOT NULL,
"youtube_link_title" VARCHAR (2000) NOT NULL -- add this to edit screen/ add screen

);

-- DROP TABLE "likes";
-- This is going to keep track of the number of likes for individual pedals.
CREATE TABLE "likes" (
"id" SERIAL PRIMARY KEY,
"user_id" INT REFERENCES "user",
"pedal_id" INT REFERENCES "pedal",
UNIQUE ( "user_id", "pedal_id" )

);

-- DROP TABLE "photos";
-- This is going to keep track of the images for individual pedals.
CREATE TABLE "photos" (
"id" SERIAL PRIMARY KEY,
"user_id" INT REFERENCES "user",
"pedal_id" INT REFERENCES "pedal",
"photo" VARCHAR (2000) NOT NULL -- this is going to save the photos 
);

-- this GET is to retrieve all of the photos so they may be placed on the DOM. 
-- router.get('/' 
SELECT count("likes".id) as "Likes", "pedal".id, "pedal".pedal_name, "pedal"
description_of_pedal, "pedal".photo 
FROM "pedal"
LEFT OUTER JOIN "likes" on "likes".pedal_id = "pedal".id
GROUP BY "pedal".id
;


-- This GET route will grab only 1 pedal from the DOM.
-- router.get('/onePedal/:id'
SELECT count("likes".id) as "Likes", "pedal".id, "pedal".pedal_name, "pedal".description_of_pedal, "pedal".photo, ( SELECT id FROM "likes" WHERE "user_id" = $1 AND "pedal_id" = $2 ) AS isliked
FROM "pedal"
LEFT OUTER JOIN "likes" on "likes".pedal_id = "pedal".id
WHERE "pedal".id = $2
GROUP BY "pedal".id
;


-- This POST is posting all the info from the AddPedalPage
-- This has another query inside of this post
-- router.post('/'

--First Query makes the pedal information
INSERT INTO "pedal" ( "user_id", "pedal_name", "description_of_pedal", "photo" )
VALUES ( $1, $2, $3, $4 ) RETURNING "id" ;

-- This second one is for the YouTube videos
INSERT INTO "youtube_links" ("user_id", "pedal_id", "youtube_links", "youtube_link_title")
VALUES ($1, $2, $3, $4) ;
    


-- This is going to post the Like information to the DB.
-- router.post('/likes'

INSERT INTO "likes" ( "user_id", "pedal_id" )
VALUES ($1, $2 )ON CONFLICT DO NOTHING ;




-- This GET will retrieve all the pedals the said user created
-- router.get('/myPedals'

SELECT *
FROM "pedal"
WHERE "user_id" = $1
;



-- This Put/Update route only updates the Photo when the user is in edit mode on the details page.
-- router.put('/updatePhoto'

UPDATE "pedal"
SET "photo" = $1
WHERE "id" = $2 and "user_id" = $3
;



-- This Put/Update route only updates the description when the user is in edit mode on the details page.
-- router.put('/updateDescription'
UPDATE "pedal"
SET "description_of_pedal" = $1
WHERE "id" = $2 and "user_id" = $3
;

-- This Put/Update route only updates the YouTube Videos when the user is in edit mode on the details page.
-- router.put('/updateYouTube
UPDATE "youtube_links"
SET "youtube_links" = $1, "youtube_link_title" = $2
WHERE "pedal_id" = $3 AND "user_id" = $4
;


----------------------------------------
-- Everything below is in a different router called youTube.router

--Post new youtube video links.
--router.post('/'

INSERT INTO "youtube_links" ("user_id", "pedal_id", "youtube_links", "youtube_link_title")
VALUES ($1, $2, $3, $4) 
;



--This GET is going to retrieve said youtube videos that match the id.
--router.get('/:id'

SELECT * 
FROM "youtube_links"
WHERE "pedal_id" = $1 AND "user_id" =$2
;