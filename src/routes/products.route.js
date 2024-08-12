import { Router } from 'express'
import { __dirname } from '../utils.js'
import { productModel } from '../Dao/models/Product.model.js'

const router = Router()

router.post('/', async (req, res) => {
	const products = req.body

	if (!Array.isArray(products)) {
		return res.status(400).json({
			message: 'El cuerpo de la solicitud debe ser un array de productos',
		})
	}

	try {
		const result = await productModel.insertMany(products)
		res.status(201).json({ payload: result })
	} catch (error) {
		res.status(500).json({ message: 'Error al insertar productos', error })
	}
})

router.get('/', async (req, res) => {
	const { limit = 10, page = 1, sort = '', ...query } = req.query
	const sortManager = {
		asc: 1,
		desc: -1,
	}

	const products = await productModel.paginate(
		{ ...query }, // le paso el resto de las consultas o filtros (nombre='',precio='',categoria=')
		{
			limit,
			page,
			...(sort && { sort: { price: sortManager[sort] } }),
			customLabels: { docs: 'payload' },
		}
	)

	res.json({
		...products,
		status: 'success',
	})
})

router.get('/:id', async (req, res) => {
	const { id } = req.params

	const productFinded = await productModel.findById(id)

	const status = productFinded ? 200 : 404

	res.status(status).json({ payload: productFinded })
})

router.put('/:id', async (req, res) => {
	const { id } = req.params
	const updateData = req.body

	try {
		// Busca el producto por ID y actualiza con los datos proporcionados
		const productUpdated = await productModel.findByIdAndUpdate(
			id,
			updateData,
			{ new: true, runValidators: true } // Devuelve el documento actualizado y valida los datos
		)

		if (!productUpdated) {
			return res.status(404).json({ message: 'Producto no encontrado' })
		}

		res.status(200).json({
			message: 'Producto actualizado exitosamente',
			payload: productUpdated,
		})
	} catch (error) {
		res.status(500).json({
			message: 'Error al actualizar el producto',
			error,
		})
	}
})

router.delete('/:id', async (req, res) => {
	const { id } = req.params
	const isDelete = await productModel.findByIdAndDelete(id)
	res.status(isDelete ? 200 : 400).json({ payload: isDelete })
})

export default router
