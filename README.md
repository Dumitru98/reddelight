# reddelight
This is a site for striptease (sexual toys)
TODO
Login -
	///Done
Signup - 
	///Done
Control Panel Admin - 
	-Add/Remove item
		-Item object with price, sizes
			-colors + images
		-Category for the product
	-Change Item
		-Add/remove image
		-Change price
		-Change colors + add images
		-Add/Remove/Change sizes
Dashboard 
	-SearchBar - By name - By Category
		Tabulatori
	-Dashboard With newest items
		-Show image
		-Show price
		-Show discount if available
	-Shop 
		-Categories 
		-Item display with image, name, price, if is in stock, add to cart
	-Command page
		-Adresa
		-Nume
		-Telefon
		-Email
		-Items + total price
		-Transport price
	-Shopping cart
		-Show items + remove button
		-Show total price
		-Redirect to command
	-Contact + link social media

	-ROUTES:
		-getUserInfo			v
		-logInUser				v
		-signUpUser				v
		-logOutUser				v
		-updateUserInfo			v
		-sendCommand

		-getAllProducts			v
		-getProductsByCategory	v
		-createNewProduct		v
		-deleteProduct			v
	
	-METHODS:
	Product:{
		-productId(number)		v
		-Name(string)			v
		-Price(number)			v
		-Stock(number)			v
		-categories[string]		v
		-sizes[string]
		-colors[string]
		-seazon(string)
		-discount(number)
		-date(date)
	}
		-productsByCategory(categoryName) => List of Products		v
		-allProducts() => bool										v
		-getUserInfo(token) => bool									v
		-createProduct(Product,[categoryName]) => bool				v
		-deleteProduct(ProductId) => bool							v
		-createCategory(name) => bool								v
		-deleteCategory(name) => bool								v
		-addProductsToCategory(name,[productIds]) => bool			v

		Produs:
		Culaore
		Marime
		Accesorii
		chiloti
		sutiene
		costume
		body
		set-uri 