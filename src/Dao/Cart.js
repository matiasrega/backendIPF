import { v4 as uuidv4 } from 'uuid'
import { cartModel } from './models/Cart.model.js' // Ajusta la ruta según tu estructura

export class CartManager {
	constructor() {}

	async getCarts() {
		try {
			const carts = await cartModel
				.find()
				.populate('products.product')
				.lean()
			return carts
		} catch (error) {
			console.error('Error retrieving carts:', error)
			throw error
		}
	}

	async newCart() {
		try {
			const newCart = { products: [] }
			const cart = new cartModel(newCart)
			await cart.save()
			return cart
		} catch (error) {
			console.error('Error creating new cart:', error)
			throw error
		}
	}

	async getCartById(id) {
		try {
			const cart = await cartModel
				.findById(id)
				.populate('products.product')
				.lean()
			return cart || console.log('Not Found')
		} catch (error) {
			console.error('Error retrieving cart:', error)
			throw error
		}
	}

	async addProductToCart(id, productId) {
		try {
			const cart = await cartModel.findById(id)

			if (!cart) {
				console.log('Cart not found')
				return
			}

			const productIndex = cart.products.findIndex(
				(prod) => prod.product.toString() === productId
			)
			if (productIndex === -1) {
				cart.products.push({ product: productId, quantity: 1 })
			} else {
				cart.products[productIndex].quantity += 1
			}

			await cart.save()
		} catch (error) {
			console.error('Error adding product to cart:', error)
			throw error
		}
	}
}
