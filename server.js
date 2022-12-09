const http = require('http');
const app = require('./app');
httpProxy = require('http-proxy');
//
// Create your proxy server and set the target in the options.
//
httpProxy.createProxyServer({target:'http://localhost:3000'}).listen(8000); // See (†)

const normalizePort = val => {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
        return val;
    }
    if (port >= 0) {
        return port;
    }
    return false;
};
const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

const errorHandler = error => {
    if (error.syscall !== 'listen') {
        throw error;
    }
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges.');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use.');
            process.exit(1);
            break;
        default:
            throw error;
    }
};

const server = http.createServer(app);

// SOCKET
var io = require('socket.io')(server);
let userCount = 0


io.on("connection", (socket) => {
    console.log("Client connected");
    userCount++
    io.emit("count", userCount)
    socket.on("disconnect", () => {
        console.log("Client disconnected");
        userCount--
        io.emit("count", userCount)

    });
    socket.on('npmStop', () => {
        process.exit(0);
    });

    socket.on('newMsg', () => {
        io.emit('newMsg')
    })

    socket.on('resetTchat', () => {
        io.emit('reset')
    })

    socket.on('count', (count) => {
        io.emit('refreshCount', count)
    })

})

// SERVER

server.on('error', errorHandler);
server.on('listening', () => {
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
    console.log('Listening on ' + bind);
});

server.listen(port);
