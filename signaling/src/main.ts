import {Server} from 'socket.io'


const ws = new Server(8080, {
  cors: {
    origin: ['http://localhost:3000']
  },
  path: '/ws/',
  serveClient: false,
})

ws.on('connection', socket => {
  console.log(`[connection] ${socket.id}`)
  socket.on('disconnect', () => {
    console.log(`[disconnect] ${socket.id}`)
  })
})
