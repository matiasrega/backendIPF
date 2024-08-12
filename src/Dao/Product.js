import { v4 as uuidv4 } from 'uuid'
import { productModel } from './models/Product.model.js'

export class Product {
	constructor(title, description, price, thumbnail, code, stock) {
		this.title = title
		this.description = description
		this.price = price
		this.thumbnail = thumbnail
		this.code = code
		this.stock = stock
		this.status = true
	}
}

export class ProductManager {
	constructor() {}

	async addProduct(product) {
		try {
			const isCodeDuplicate = await productModel.findOne({
				code: product.code,
			})

			const hasInvalidProperty = Object.values(product).some(
				(property) => !property
			)

			if (isCodeDuplicate) return console.log('Code Duplicate')
			if (hasInvalidProperty)
				return console.log('Invalid or incomplete information')

			const newProduct = new productModel({ ...product, _id: uuidv4() })
			await newProduct.save()

			console.log('Product added successfully')
		} catch (error) {
			console.error('Error adding product:', error)
			throw error
		}
	}

	async getProducts() {
		try {
			const products = await productModel.find().lean()
			return products
		} catch (error) {
			console.error('Error retrieving products:', error)
			throw error
		}
	}

	async getProductById(id) {
		try {
			const product = await productModel.findById(id).lean()
			return product || console.log('Not found')
		} catch (error) {
			console.error('Error retrieving product:', error)
			throw error
		}
	}

	async updateProduct(id, payload) {
		try {
			const updatedProduct = await productModel.findByIdAndUpdate(
				id,
				{ $set: payload },
				{ new: true, runValidators: true }
			)

			if (!updatedProduct) {
				throw new Error('Product not found')
			}

			console.log('Product updated successfully')
			return updatedProduct
		} catch (error) {
			console.error('Error updating product:', error)
			throw error
		}
	}

	async deleteProduct(id) {
		try {
			const deletedProduct = await productModel.findByIdAndDelete(id)

			if (!deletedProduct) {
				throw new Error('Product not found')
			}

			console.log('Product deleted successfully')
			return deletedProduct
		} catch (error) {
			console.error('Error deleting product:', error)
			throw error
		}
	}
}
