import { ProductManager } from '../Dao/Product.js'
import { productModel } from '../Dao/models/Product.model.js'
import { __dirname } from '../utils.js'
import { Router } from 'express'
const router = Router()
const productList = new ProductManager(
	__dirname + '/data/databaseproducts.json'
)

router.get('/', async (req, res) => {
	const list = await productList.getProducts()

	res.render('index', { list })
})

router.get('/carts/:cid', (req, res) => {
	const { cid } = req.params
	res.render('carts', {
		cid,
	})
})

router.get('/products', (req, res) => {
	res.render('products')
})

export default router
