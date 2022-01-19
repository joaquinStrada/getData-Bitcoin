import '@babel/polyfill'
import app from './app'
import { Server as WebsocketServer } from 'socket.io'
import http from 'http'
import { init } from './sockets'
import getData from './getData'

getData()

const server = http.createServer(app)

const httpServer = server.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'))
})

const io = new WebsocketServer(httpServer)

init(io)