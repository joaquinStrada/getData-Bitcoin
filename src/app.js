import express from 'express'
import morgan from 'morgan'
import path from 'path'

import indexRouter from './routes/index.routes'
import { config } from './lib/config'

const app = express()

// settings
app.set('port', config.express.port)

// midelwares
app.use(morgan('dev'))

// routes
app.use('/api', indexRouter)

// static files
app.use(express.static(path.join(__dirname, 'public')))

export default app
