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

		-getLatestProducts
		-getAllProducts			v
		-getProductsByCategory	v
		-sendCommand
		-createNewProduct		v
		-deleteProduct			v
	
	-METHODS:
	Product:{
		-productId(number)
		-Name(string)
		-Price(number)
		-Stock(number)
		-sizes[string]
		-colors[string]
		-seazon(string)
		-discount(number)
	}
		-productsByCategory(categoryName) => List of Products
		-allProducts() => List of Products
		-getUserInfo(token) => User info
		-createProduct(Product,[categoryName]) => bool
		-deleteProduct(ProductId) => bool