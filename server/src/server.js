import http from 'http'
import { Server } from 'socket.io'
import app from './app.js'
import { connectDB } from './config/db.js'

const PORT = process.env.PORT
const server = http.createServer(app)

export const io = new Server(server, {
  cors: { origin: process.env.CLIENT_URL, methods: ['GET', 'POST'] }
})

io.on('connection', (socket) => {
  console.log('Socket connected:', socket.id)
  socket.on('disconnect', () => console.log('Socket disconnected:', socket.id))
})

connectDB().then(() => {
  server.listen(PORT, () => console.log(`Server running on port ${PORT}`))
})