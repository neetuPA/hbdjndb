initial command 
npm init 
npm i express mongoose
npm install nodemon --save-dev
npm i mongodb
npm i dotenv
To start the server run this command -- npm run dev

after this use this http://localhost:3000/api/tasks
to add,delete ,update ,get the task 
for getting the task by id use GEt : http://localhost:3000/api/tasks/<id>
 this api 


 while i test these api .. i faced this Challenges...
 
  1.At first, I made id a required field in the database. When I tried to add a task without an id, it gave an error.
   I solved this by letting the backend create a unique ID automatically instead of sending it from the client.

  2. Sometimes, when sending data in POST requests, the server gave “Unexpected end of JSON input” errors.
  3. While I use the POST method and in status instaed of completed I wrote complete in json body it through error tha such status is not present in enum status.
  4. I got errors like Cannot POST /api/tasks because the route in Express was not correct.
