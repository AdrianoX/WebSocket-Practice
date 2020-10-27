const express = require('express');
const path = require('path');
const socket = require('socket.io');

const app = express();

const messages = [];
const users = [];

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '/client/')));

// Show index.html as main page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/index.html'));
});

app.use((req, res) => {
  res.status(404).json({ message: 'Not found...' });
})

// server 8000 --> PTT conn ?
const server = app.listen(8000, () => {
  console.log('Server is running on port: 8000');
}); 


const io = socket(server);
io.on('connection', (socket) => {
    console.log('New client! Its id – ' + socket.id);
    socket.on('message', (message) => {
        console.log('Oh, I\'ve got something from ' + socket.id);
        messages.push(message);
        socket.broadcast.emit('message', message);
      })

    socket.on('newUser', (newUser) => {
        console.log('New' + newUser + 'has loged in');
        users.push({userName: newUser, id: socket.id});
        socket.broadcast.emit('newUser', newUser); 
        console.log(users);
      })
      
      socket.on('disconnect', () => {
        let user = users.findIndex(user => user.id === socket.id);
        let leftUser = users.find(user => user.id === socket.id);
        console.log('user:', user, 'leftUser:', leftUser);
        console.log('Oh, socket ' + socket.id + ' has left');
        socket.broadcast.emit('userLeft', leftUser); 
        users.splice(user , 1);
      });
    console.log('I\'ve added a listener on message event \n');
  });