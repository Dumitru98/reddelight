<template>
	<div class="container">
		<nav class="navbar navbar-expand-lg navbar-waterloo bg-waterloo">
		<a class="navbar-brand" href="dashboard.html">Red Delight</a>
	<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
		<span class="navbar-toggler-icon"></span>
	</button>

		<div class="collapse navbar-collapse" id="navbarSupportedContent">
			<ul class="navbar-nav mr-auto">
			<li class="nav-item">
				<a class="nav-link" href="dashboard.html">Dashboard</a>
			</li>
			<li class="nav-item">
				<a class="nav-link" href="shop.html">Shop</a>
			</li>
			<li class="nav-item">
				<a class="nav-link" href="commandPage.html">Command Page</a>
			</li>
				<li class="nav-item">
				<a class="nav-link" href="contact.html">Contact</a>
			</li>
			<li class="nav-item">
				<a class="nav-link" href="controlPanel.html">Control Panel</a>
			</li>
			<li class="nav-item active">
				<a class="nav-link" href="shoppingCart.html">Cart</a>
			</li>
			</ul>

			<ul class="navbar-nav ml-auto">
				<li class="navbar-text">
					<a class="nav-link" href="login.html">Login</a>
				</li>
				<li class="navbar-text">
					<a class="nav-link" href="signup.html">Sign up</a>
				</li>
			</ul>
		</div>
	</nav>
	
	</div>
</template>
<script>
var Loading = require('../Loading.vue');
class asset {
	constructor (id, name, image, price){
		this.id = id;
		this.name = name;
		this.image = image;
		this.price = price;
	}
}
/*class produs {
	constructor (id,name,image,price,stock,marime,culori,tip){
		this.id = id;
		this.name = name;
		this.image = image;
		this.price = price;
		this.stock = stock;
		this.marime = marime;
		this.culori = culori;
		this.tip = tip;
	}
}*/
module.exports = {
	name: 'ShoppingCart',

	components: {
		Loading
	},

	data(){
		return {
			products:[],
		};
	},
	
	async created(){
		var ids = this.$store.getters['settings/ids'];
		var produs = null;
		console.log(this.$store.state);
		for(let id of ids) {
			var productFound = false;

			var storeProductsFromShop = this.$store.getters['product/products'];

			for (let product of storeProductsFromShop) {
				if (product.id === id) {
					console.log(product);
					productFound = true;
				}
			}

			if (!productFound) {
				var storeProductsFromCategory = this.$store.getters['category/products'];

				for (let product of storeProductsFromCategory) {
					if (product.id === id) {
						console.log(product);
						productFound = true;
					}
				}

				if (!productFound) {
					var product = await this.$store.dispatch('product/get', id);
					console.log(product);
				}
			}
			produs = new asset(product.id,product.name,'//nothing//',product.price);
			this.products.push(produs);
		}
	}
};
</script>
