import { api } from '../constants/environments.js'
const { base_url, endpoint_product, endpoint_cart, cart_mock } = api

function renderCardsFromDataToContainer(payload, nodeContainer) {
	payload.forEach((product) => {
		const div = document.createElement('div')

		div.classList.add(
			'tile',
			'max-w-sm',
			'rounded',
			'overflow-hidden',
			'shadow-lg'
		)
		div.innerHTML = `			
            <img class="w-full" src="${product.thumbnail}" alt="Sunset in the mountains">
            <div class="px-6 py-4">
                <div class="font-bold text-xl mb-2">${product.title}</div>
                <p class="text-gray-700 text-base">
                    ${product.description}
                </p>
            </div>
         `
		const divButtons = document.createElement('div')
		divButtons.classList.add(
			'px-6',
			'pt-4',
			'pb-2',
			'gap-x-4',
			'flex',
			'items-center'
		)
		divButtons.innerHTML = ` <span class=" bg-gray-100 rounded-full px-3 py-2 text-xl font-semibold text-gray-800">
										$${product.price}
									</span>`
		const addCartButton = document.createElement('button')
		addCartButton.innerText = 'Agregar'
		addCartButton.classList.add(
			'bg-blue-500',
			'hover:bg-blue-700',
			'text-white',
			'font-bold',
			'py-2',
			'px-4',
			'rounded-full'
		)

		addCartButton.addEventListener('click', async () => {
			console.log('Add to cart button clicked')
			try {
				await fetch(
					base_url +
						endpoint_cart +
						cart_mock +
						'/' +
						endpoint_product +
						product._id,
					{
						method: 'POST',
					}
				)
				Swal.fire({
					icon: 'success',
					title: 'Agregado al carrito!',
					showConfirmButton: false,
					timer: 1500,
				})
			} catch (e) {
				Swal.fire({
					icon: 'error',
					title: 'Hubo un error',
					text: 'No se pudo agregar el producto al carrito.',
					showConfirmButton: true,
				})
			}
		})
		divButtons.appendChild(addCartButton)
		div.appendChild(divButtons)
		nodeContainer.appendChild(div)
	})
}

async function getProducts(callback) {
	try {
		const response = await fetch(base_url + endpoint_product)
		const result = await response.json()
		console.log('API Response:', result) // Verifica la respuesta completa
		const { payload } = result
		callback(null, payload)
	} catch (e) {
		console.error('Error fetching products:', e)
		callback(e, null)
	}
}
getProducts((error, data) => {
	if (!error) {
		const productsContainer = document.querySelector('#container-products')
		renderCardsFromDataToContainer(data, productsContainer)
	}
})
