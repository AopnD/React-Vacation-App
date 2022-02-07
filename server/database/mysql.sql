-- create database project3;
-- use project3;

-- create table users(
-- userid int auto_increment,
-- username varchar(255),
-- password varchar(255),
-- role varchar(255) default "user",
-- primary key (userid)
-- );

-- insert into users(username , password)
-- values("user1" , "1234"),
-- ("user2", "abcd"),
-- ("user3", "9876");

-- create table vacation(
-- vacationid int auto_increment,
-- destination varchar(255),
-- price varchar(255),
-- pictureurl text,
-- description varchar(1000),
-- dates varchar(255),
-- primary key(vacationid)
-- );

-- insert into vacation(destination, price, pictureurl, description, dates)
-- values("South Island, New Zealand", "$1200",  "https://travel.usnews.com/dims4/USNEWS/a798492/2147483647/resize/445x280%5E%3E/crop/445x280/quality/85/?url=https://travel.usnews.com/images/edited_south_island_nz_getty_irma_ferreira_445x280_dxgXWlc.jpg","New Zealand's South Island brims with majestic landscapes at every turn, from dramatic mountains to fjords to glaciers. Here, you can admire the mountains of Fiordland National Park, a UNESCO World Heritage Site, from hiking trails or a boat on Milford Sound. At night, journey to the University of Canterbury's Mount John Observatory to gaze at the starry skies. You can also indulge your inner daredevil in Queenstown, explore two of the most accessible glaciers in the world on the island's west coast or sample delicious food and wine in the Marlborough region.", "12/9/25"),
-- ("Paris", "$900", "https://travel.usnews.com/dims4/USNEWS/c5a8f6d/2147483647/resize/445x280%5E%3E/crop/445x280/quality/85/?url=https://travel.usnews.com/images/gettyimages-532590277_2ZNe4ra.jpg", "The City of Light draws millions of visitors every year with its unforgettable ambiance. Of course, the divine cuisine and vast art collections deserve some of the credit as well. The gentle River Seine rambles through the city, flanked by stately museums, centuries-old churches, and blocks of Rococo- and Neoclassic-design architecture, further enhanced by cascading trees and glowing streetlamps. Peppering the Seine's cobbled walks and graceful bridges are impossibly chic Parisians, probably on their way to the market, cafe or cinema.", "06/1/23"),
-- ("Bora Bora", "$2200", "https://travel.usnews.com/dims4/USNEWS/472cf27/2147483647/resize/445x280%5E%3E/crop/445x280/quality/85/?url=https://travel.usnews.com/images/borabora_445x280_dtTOVY1.jpg", "The small island of Bora Bora (just about 6 miles long and a little more than 2 miles wide) overflows with beauty. A dormant volcano rises up at its center and fans out into lush jungle before spilling into an aquamarine lagoon. In fact, author James Michener, who wrote Tales of the South Pacific, called Bora Bora the most beautiful island in the world. The 18th-century British explorer James Cook even coined it as the Pearl of the Pacific. The very definition of a tropical getaway, blissful Bora Bora abounds with luxurious resorts, sunny skies, warm waters and friendly locals.", "11/2/26");


-- create table bridge( 
-- id int auto_increment,
-- vacID int,
-- userID int,
-- foreign key(vacID) references vacation(vacationid),
-- foreign key(userID) references users(userid),
-- primary key(id)
-- );

-- insert into bridge(vacID, userID)
-- values(2,2),(2,3);