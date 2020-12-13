const { Socket } = require('dgram');
const express = require('express');
const app = express();
const server = require('http').Server(app)
// ^^ allows a server to be used with Socket.io 
const io = require('socket.io')(server)
//creates a server for us based on our express server then passes it to sockeet.io so it knows what server we're using & how to interact with it
// passes in server to the return of the require function
const { v4: uuidV4 } = require('uuid')
const postgres = require('./postgres.js');

app.use(express.json());
app.use(express.static('public'))

const peopleController = require('./controllers/video.js');
app.use('/people', peopleController);

// postgres.connect();

app.listen(process.env.PORT || 3000, () => {
    console.log('listening on port...');
})

//communicates w/ the computer not the server so no need to worry about sending traffic thru server
//server just neccessary to set up our rooms

app.set('view engine', 'ejs')
//this is how to render views, ejs cus we dowloaded ejs library

app.get('/', (req, res) => {
    res.redirect(`/${uuidV4()}`)
})
//makes room and redirects them there
//using the uuid variable to generate random room #


app.get('/:room', (req, res) => {
    res.render('room', { roomId: req.params.room })
})

//pass room Id that is coming from URL


io.on('connection', socket => {
    socket.on('join-room', (roomId, userId) => {

    })
})
//runs every time someone connects to webpage
// event listener when someone joins, pass in roomId and userId

server.listen(3001);