const express = require('express');
const { Server } = require('socket.io');
const http = require('http');
const cors = require('cors');

const app = express();
const server = http.createServer(app);

const corsOptions = {
    origin: 'https://brandonkweber.github.io', // Allow only this origin
    methods: ['GET', 'POST'],                  // Allow only GET and POST
    allowedHeaders: ['Content-Type'],          // Allow only specific headers
};

// Allow CORS (for requests from GitHub Pages)
app.use(cors(corsOptions));

// Initialize Socket.IO
const io = new Server(server, {
    cors: {
        origin: 'https://brandonkweber.github.io',
        methods: ['GET', 'POST'],
    },
});

io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('chat message', (msg) => {
        socket.broadcast.emit('chat message', msg); // Do not emit to sender
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});