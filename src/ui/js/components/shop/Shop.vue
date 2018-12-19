
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
					<li class="nav-item active">
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

				<form class="form-inline my-2 my-lg-0">
					<input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" v-model="searchToken" >
					<button class="btn btn-outline-success my-2 my-sm-0" type="button">Search</button>
				</form>
			</div>
		</nav>

		<select v-model="categoryToken">
			<option :value="''"></option>
			<option v-for="(item,index) in Categories" :key=index :value="item">{{ item }}</option>
		</select>

		<b-pagination size="large" align="center" v-model="currentPage" :total-rows="100"  :per-page="10" @input="getProducts(currentPage)">
		</b-pagination>

		<div class="row">
			<div class="col-md-4" v-for="(item,index) in filteredItems" :key="index">
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

					<div class="card-body" @click="productPage(item.id)">
						<h4 class="card-title" @click="productPage(item.id)">{{ item.name }}</h4>
						<div class="card-text">{{ item.price }} Lei</div>
					</div>
				</div>
			</div>
		</div>
		<b-pagination size="large" align="center" v-model="currentPage" :total-rows="100"  :per-page="10" @input="getProducts(currentPage)">
		</b-pagination>
	</div>
</template>

<script>

var Loading = require('../Loading.vue');

// class asset {
// 	constructor (id, name, image, price, categories){
// 		this.id = id;
// 		this.name = name;
// 		this.image = image;
// 		this.price = price;
// 		this.categories = categories;
// 	}
// }

class asset {
	constructor (id, name, price, stock){
		this.id = id;
		this.name = name;
		this.price = price;
		this.stock = stock;
	}
}

module.exports = {
	name: 'Shop',

	components: {
		Loading
	},
	
	data() {
		var urlParams = new URLSearchParams(window.location.search);

		return {
			searchToken:'',
			categoryToken:'',
			products:[],
			next: urlParams.get('id'),
			noSearch:true,
			Categories:[],
			currentPage:1,
			index:0,
		};
	},

	async created() {
		window.localStorage.setItem('cart', JSON.stringify([]));
		let state = await this.$store.dispatch('category/all');

		if(state){
			for(let category of state) {
				this.Categories.push(category.name);
			}
			this.Categories.sort();
		}

		let products = await this.$store.dispatch('product/get30',1);
		window.localStorage.setItem('shopProducts', JSON.stringify(products));

		for(let product of products) {
			this.products.push(new asset(product.id, product.name, product.price, product.stock));
		}
	},

	computed: {
		filteredItems() {
			return this.products.filter( item => {
				return item.name.toLowerCase().includes(this.searchToken.toLowerCase());
			});
		}
	},

	methods: {
		async productPage(id){
			this.next=id;
			await this.$store.dispatch('settings/redirect',{
				address:'PRODUCTPAGE',
				id:id,
			});

		},

		async getProducts(index){
			console.log(index);
			let state = await this.$store.dispatch('product/get30', index);
			if(state){
				this.products=[];
				for(let product of state) {
					this.products.push(new asset(product.id, product.name, product.price, product.stock, null, null));
				}	
			}
		},
	}
};

</script>