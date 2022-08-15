# Rumble - your eventplanningtool 

Say goodbye to hundreds of different whatsapp chats and exploding messages and discussions. See and plan all your events in one place with your friends and decide on details based on votings (Do you want red wine or white wine?) or even plan a private poll for deciding ona gift for the amazing host of the event you are attending. 

# Used Technologies 

The application is built based on the MERN stack (MongoDB, Express, React and Node.JS). The SPA frontend built with React consists of multiple views and implements all CRUD actions by communicating with a REST API backend built with ExpressJS, MongoDB and Mongoose.

This is the frontend repository of the application. Check out the backend repository here.
https://github.com/codingTeamLHLR/eventplanningtool_server

# Demo 

Check out our app here and please not that it is designed for mobile. 
https://eventplanningtool.netlify.app/events

## How to run the app on local

Environment variables needed: 

- REACT_APP_API_URL='http://localhost:5005/api'
- CLOUDINARY_NAME
- CLOUDINARY_UPLOAD_PRESET

For using picture upload, you need a cloudinary account and set the above mentioned variables.

Run `npm start` to run the react.js application.
