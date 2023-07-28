const express = require('express')
const  path = require('path')
const http = require('http')
const socketIO = require('socket.io')
var cors = require('cors')
const app = express()
const server = http.createServer(app)
const io = socketIO(server)

server.listen(3001)

app.use(express.static(path.join(__dirname, 'public')))
app.use(cors())
let connectedUsers = []
io.on('connection', (socket)=>{
    console.log('Conexão iniciada')
    socket.on('user-enter', (user)=>{
          socket.username ={...user, id:socket.id} // user guarda nome e papel(cliente ou vendedor)
          connectedUsers.push(socket.username)
          io.emit('users-logged-in', socket.username)
         
    })

})
