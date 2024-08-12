import express from 'express'
import { create } from 'express-handlebars'
import ProductRouter from './routes/products.route.js'
import CartRouter from './routes/cart.route.js'
import ViewsRouter from './routes/views.route.js'
import { __dirname } from './utils.js'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

const port = process.env.PORT || 8080
const app = express()
const hbs = create({})

const httpServer = app.listen(port, () => {
	console.log(`Server connected into port ${port}`)
})

app.engine('handlebars', hbs.engine)
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname + '/public'))

app.use('/', ViewsRouter)
app.use('/api/product/', ProductRouter)
app.use('/api/cart/', CartRouter)

mongoose
	.connect(
		'mongodb+srv://matiasregadb:idtNw2qpOpjfiBow@matiasdb.d7mvogc.mongodb.net/?retryWrites=true&w=majority&appName=matiasdb',
		{ dbName: 'ecommerce' }
	)
	.then(() => {
		console.log('connected to DB')
	})
