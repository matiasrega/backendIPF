import { api } from '../constants/environments.js'
const { base_url, endpoint_product, endpoint_cart } = api

const containerProduct = document.querySelector('#container-products')

async function fetchProducts() {
	try {
		const response = await fetch(base_url + endpoint_product)
		const result = await response.json()
		console.log('API Response:', result)
		const { payload } = result
		renderProducts(payload)
	} catch (error) {
		console.error('Error fetching products:', error)
	}
}

async function addToCart(productId) {
	try {
		await fetch(`${base_url + endpoint_cart}/${productId}`, {
			method: 'POST',
		})
		Swal.fire({
			title: '¡Producto agregado!',
			text: 'El producto ha sido agregado al carrito.',
			icon: 'success',
			timer: 2000,
			showConfirmButton: false,
		})
	} catch (error) {
		console.error('Error adding to cart:', error)
		Swal.fire({
			title: 'Error',
			text: 'Hubo un problema al agregar el producto al carrito.',
			icon: 'error',
		})
	}
}

async function removeFromCart(productId) {
	try {
		await fetch(`${base_url + endpoint_cart}/${productId}`, {
			method: 'DELETE',
		})
		Swal.fire({
			title: 'Producto eliminado',
			text: 'El producto ha sido eliminado del carrito.',
			icon: 'success',
			timer: 2000,
			showConfirmButton: false,
		})
	} catch (error) {
		console.error('Error removing from cart:', error)
		Swal.fire({
			title: 'Error',
			text: 'Hubo un problema al eliminar el producto del carrito.',
			icon: 'error',
		})
	}
}

function renderProducts(products) {
	containerProduct.innerHTML = ''
	products.forEach((product) => {
		const divCard = document.createElement('div')
		divCard.classList.add(
			'tile',
			'max-w-sm',
			'rounded',
			'overflow-hidden',
			'shadow-lg'
		)
		divCard.innerHTML = `
            <img class="w-full" src="${product.thumbnail}" alt="${product.title}">
            <div class="px-6 py-4">
                <div class="font-bold text-xl mb-2">${product.title}</div>
                <p class="text-gray-700 text-base">
                    ${product.description}
                </p>
            </div>
            <div class="px-6 pt-4 pb-2">
                <span class="inline-block bg-gray-100 rounded-full px-3 py-2 text-xl font-semibold text-gray-800 mr-2 mb-2">
                    $${product.price}
                </span>
                <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full add-to-cart">
                    Agregar al carrito
                </button>
                <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full remove-from-cart">
                    Eliminar del carrito
                </button>
            </div>
        `
		containerProduct.appendChild(divCard)

		divCard
			.querySelector('.add-to-cart')
			.addEventListener('click', () => addToCart(product._id))
		divCard
			.querySelector('.remove-from-cart')
			.addEventListener('click', () => removeFromCart(product._id))
	})
}

fetchProducts()

/*import { api } from '../constants/environments.js' // Importar variables de entorno
const { base_url, endpoint_product } = api

const containerProduct = document.querySelector('#container-products')

// Función para obtener productos de la API
async function fetchProducts() {
	try {
		const response = await fetch(base_url + endpoint_product)
		const result = await response.json()
		console.log('API Response:', result)
		const { payload } = result
		renderProducts(payload)
	} catch (error) {
		console.error('Error fetching products:', error)
	}
}

function renderProducts(products) {
	containerProduct.innerHTML = ''
	products.forEach((product) => {
		const divCard = document.createElement('div')
		divCard.classList.add(
			'tile',
			'max-w-sm',
			'rounded',
			'overflow-hidden',
			'shadow-lg'
		)
		divCard.innerHTML = `
            <img class="w-full" src="${
				product.thumbnail ||
				'https://v1.tailwindcss.com/img/card-top.jpg'
			}" alt="${product.title}">
            <div class="px-6 py-4">
                <div class="font-bold text-xl mb-2">${product.title}</div>
                <p class="text-gray-700 text-base">
                    ${product.description}
                </p>
            </div>
            <div class="px-6 pt-4 pb-2">
                <span class="inline-block bg-gray-100 rounded-full px-3 py-2 text-xl font-semibold text-gray-800 mr-2 mb-2">
                    $${product.price}
                </span>
            </div>
        `
		containerProduct.appendChild(divCard)
	})
}

// Llamar a la función para obtener productos cuando el script se carga
fetchProducts()

/*const containerProduct = document.querySelector('#container-products')

socket.on('onchangeProduct', (data) => {
	containerProduct.innerHTML = ''
	data.forEach((product) => {
		const divCard = document.createElement('div')
		divCard.classList.add(
			'tile',
			'max-w-sm',
			'rounded',
			'overflow-hidden',
			'shadow-lg'
		)
		divCard.innerHTML = `
            <img class="w-full" src="https://v1.tailwindcss.com/img/card-top.jpg" alt="Sunset in the mountains">
            <div class="px-6 py-4">
                <div class="font-bold text-xl mb-2">${product.title}</div>
                <p class="text-gray-700 text-base">
                    ${product.description}
                </p>
            </div>
            <div class="px-6 pt-4 pb-2">
                <span class="inline-block bg-gray-100 rounded-full px-3 py-2 text-xl font-semibold text-gray-800 mr-2 mb-2">
                    $${product.price}
                </span>
            </div>
        `
		containerProduct.appendChild(divCard)
	})
})*/
