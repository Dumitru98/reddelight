<template>
	<div class="container">
		<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
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
			<li class="nav-item">
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
	<div class="col-md" >
  <div class="card">
    <div :id="'car'+product.id" class="carousel slide" data-ride="carousel">
		<div class="carousel-inner" >
			<div class="carousel-item active">
			<img class="d-block w-100" src="../../../img/generic-blue-ridge-mountains-2528x1422.jpg" alt="First slide">
			</div>
			<div class="carousel-item">
			<img class="d-block w-100" src="../../../img/josh-kao-genericmountains.jpg" alt="Second slide">
			</div>
			<div class="carousel-item">
			<img class="d-block w-100" src="../../../img/Monasterio_Khor_Virap,_Armenia,_2016-10-01,_DD_25.jpg" alt="Third slide">
			</div>
		</div>
		<a class="carousel-control-prev" :href="'#car'+product.id"  role="button" data-slide="prev">
			<span class="carousel-control-prev-icon" aria-hidden="true"></span>
			<span class="sr-only">Previous</span>
		</a>
		<a class="carousel-control-next" :href="'#car'+product.id"  role="button" data-slide="next">
			<span class="carousel-control-next-icon" aria-hidden="true"></span>
			<span class="sr-only">Next</span>
		</a>
	</div>
    <div class="card-body">
      <h4 class="card-title">{{ product.name }}</h4>
		<div class="card-text">Marime</div>
		<div class="card-text">Culoare</div>
		<div class="card-text">Descriere</div>
      <div class="card-text">{{ product.price / 100 }} lei</div>
      <div class="row justify-content-end">
        <button class="btn btn-primary">Add to cart</button>
      </div>
    </div>
  </div>
</div>
	</div>
</template>
<script>
var Loading = require('../Loading.vue');
var urlParams = new URLSearchParams(window.location.search);
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
	name: 'Shop',
	async created(){
		this.id = urlParams.get('id');

		var productFound = false;

		var storeProductsFromShop = this.$store.getters['product/products'];

		for (let product of storeProductsFromShop) {
			if (product.id === this.id) {
				console.log(product);
				productFound = true;
			}
		}

		if (!productFound) {
			var storeProductsFromCategory = this.$store.getters['category/products'];

			for (let product of storeProductsFromCategory) {
				if (product.id === this.id) {
					console.log(product);
					productFound = true;
				}
			}

			if (!productFound) {
				var product = await this.$store.dispatch('product/get', this.id);
				console.log(product);
			}
		}

		this.product = new asset(product.id, product.name, '//placehold.it/200', product.price);
	},
	components: {
		Loading
	},
	data(){
		return {
			id: urlParams.get('id'),
			product:{},
		};
	}
};
</script>
