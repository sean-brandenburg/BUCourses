# BUcourses

[![Build Status](https://travis-ci.org/quinnyyy/bucourses.svg?branch=master)](https://travis-ci.org/quinnyyy/bucourses)


## TODO:
* ~~server/server.ts: Add filter functionality~~
* ~~We saved # of credits as a string to the database. We should try to save it as a number.~~
* server/server.ts: Do error handling
* public3/src/components: Define a type to represent a classinfo
* scraper/saveClassInfo.py: Make it so that if the scraper fails at any time to handle the error and instead of crashing, save the course code that failed to a log file
* scraper/saveClassInfo.py: Use arg parser so you can specify what number to start at
* ~~public3/src/components/Filter: fix the checkboxes and put them in a list~~
* ~~public3/src/components/Filter: Add state functionality and api call based on state. Figure out what best pattern is for filtering behavior~~
* ~~public3/src/components/Filter: style/size the filter component~~
* public3/src/components/Dropdown: Make the checked options show up under your dropdown
* ~~public3/src/components/Filter or ClassTopLevel: Get the credits hooked up. I think it is best idea to process client side and keep the API as is~~
* public3/src/components: Make a function to do API calls

## Things we need to add to the course schema:
* ~~Actual class name~~ 
* ~~Level (0--,1--,2-- etc.)~~
* ~~College e.g. Engineering, Arts and Sciences, Questrom / ENG, CAS, QST~~
* ~~Department e.g. Electrical and Computer Engineering, Computer Science / EC CS. This actually isn't trivial because it's not listed on the page anywhere... have to parse the course code and map it i guess... really a lot of work !!! :)~~
* Other stuff as we see fit

## Other features
* Resume upload + feedback
* Class swap marketplace
* Teacher/class helpful info db

## /scraper
**Python** code for scraping course info from https://www.bu.edu/academics/cas/courses/ using **BeautifulSoup4**  
Writes the scraped info to text file and then writes data from text file to **MongoDB Atlas** database.

## /server
**TypeScript** + **node.js** server for API.  
The server opens a connection to **MongoDB Atlas** database and when an api call is made it gets the requested data from the database and then serves it to the client\

## Frontend...
**React** + **TypeScript**
