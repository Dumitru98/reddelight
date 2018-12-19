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
	<div class="row">
			<div class="col-md-6" v-for="(item,index) in products" :key="index">
				<div class="card" >
					<div :id="'car'+item.id" class="carousel slide" data-ride="carousel">
						<div class="carousel-inner">
							<div class="carousel-item active" @click="productPage(item.id)">
								<img class="d-block w-100" src="../../../img/generic-blue-ridge-mountains-2528x1422.jpg" alt="First slide">
							</div>
							<div class="carousel-item" @click="productPage(item.id)">
								<img class="d-block w-100" src="../../../img/josh-kao-genericmountains.jpg" alt="Second slide">
							</div>
							<div class="carousel-item" @click="productPage(item.id)">
								<img class="d-block w-100" src="../../../img/Monasterio_Khor_Virap,_Armenia,_2016-10-01,_DD_25.jpg" alt="Third slide">
							</div>
						</div>

						<a class="carousel-control-prev" :href="'#car'+item.id"  role="button" data-slide="prev">
							<span class="carousel-control-prev-icon" aria-hidden="true"></span>
							<span class="sr-only">Previous</span>
						</a>

						<a class="carousel-control-next" :href="'#car'+item.id"  role="button" data-slide="next">
							<span class="carousel-control-next-icon" aria-hidden="true"></span>
							<span class="sr-only">Next</span>
						</a>
					</div>

					<div class="card-body">
						<h4 class="card-title">{{ item.name }}</h4>
						<div class="card-text">{{ item.price }} Lei</div>
						<div class="card-text">{{ item.color }}</div>
						<div class="card-text">{{ item.size }}</div>
					</div>
				</div>
			</div>
		</div>
		<CommandPage></CommandPage>
	</div>
</template>
<script>
var CommandPage = require('../commandPage/CommandPage.vue');
var Loading = require('../Loading.vue');
class asset {
	constructor (id, name, image, price, size, color){
		this.id = id;
		this.name = name;
		this.image = image;
		this.price = price;
		this.size = size;
		this.color = color;
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
		CommandPage,
		Loading
	},

	data(){
		return {
			command: {
				firstName: 'Dumitru',
				lastName: 'Calin',
				email: 'andyalpha98@gmail.com',
				phone: '0723 573 258',
				state: 'Sector 3',
				city: 'Bucuresti',
				address: 'aleea Fizicienilor, nr. 18, ap. 45',

				products: [
					{
						name: 'Tanga Rosii Colectia de Craciun',
						id: 'jaibgorabo847837yta84',
						price: 90.99,
						quantity: 1,
						color: 'Rosu',
						size: 'Small'
					},
					{
						name: 'Pereche Stockings Rosii',
						id: 'u93rhw9uhta9wiuaerg4',
						price: 56.99,
						quantity: 2,
						color: 'Rosu',
						size: 'Medium'
					}
				]
			},

			products:[],
		};
	},
	
	created() {
		this.$store.dispatch('user/makeCommand', this.command);
		var produs = null;
		var storeProductsFromShop = JSON.parse(window.localStorage.getItem('cart'));

		for(let product of storeProductsFromShop){
			produs = new asset(product.id,product.name,'//nothing//',product.price, product.sizes, product.colors);
			this.products.push(produs);
		}	
	}
};
</script>
