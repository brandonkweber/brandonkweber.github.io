const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);

// Enable CORS for Express
app.use(cors({
    origin: 'https://bkweber.com', // Replace with your front-end URL
    methods: ['GET', 'POST'],
    credentials: true
}));

// Configure Socket.IO with CORS
const io = new Server(server, {
    cors: {
        origin: 'https://bkweber.com', // Replace with your front-end URL
        methods: ['GET', 'POST']
    }
});

// Socket.IO connection handler
io.on('connection', (socket) => {
    console.log('A user connected');
    socket.on('message', (data) => {
        console.log('Message received:', data);
    });
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
