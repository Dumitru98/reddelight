
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
				<li class="nav-item active">
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

		<form class="form-group">
			<h2>Add Product</h2>
			<input class="form-control" v-model="testName" placeholder="Name">
			<input class="form-control" v-model="testPrice" placeholder="Price">
			<input class="form-control" v-model="testStock" placeholder="Stock">

			<input class="form-control" v-model="testSize" placeholder="Size" id="sizeInput">
			<button class="btn btn-inline" type="button" @click="addSize">Add Size</button>
			<label for="sizeList">Sizes</label>
			<ul id="sizeList">
				<li v-for="(size, index) in SizesToShow " :key="index">
					<p>{{size}}<button class="btn btn-inline" type="button" @click="popSize(size)"> x</button></p>
				</li>
			</ul>

			<input class="form-control" v-model="testColors" placeholder="Color" id="colorInput">
			<button class="btn btn-inline" type="button" @click="addColor">Add Color</button>
			<label for="colorList">Colors</label>
			<ul id="colorList">
				<li v-for="(color, index) in ColorsToShow " :key="index">
					<p>{{color}}<button class="btn btn-inline" type="button" @click="popColor(color)"> x</button></p>
				</li>
			</ul>

			<label for="categoryList">Category</label>
			<select v-model="testCategory" id="categoryInput">
				<option v-for="(item,index) in Categories" :key=index :value="item">{{item}}</option>
			</select>
			<button @click="addCategory" class="btn btn-inline" type="button">Add Category</button>

			<ul id="categoryList">
				<li v-for="(category, index) in CategoriesToShow" :key="index">
					<p>{{category}}<button type="button" @click="popCategory(category)"> x</button></p>
				</li>
			</ul>
		</form>
		<button class="btn" type="submit" @click="createProduct()">Add Product</button>

		<form>
			<h2>Remove Product</h2>
			<div class="row">
				<div class="col-md-4" v-for="(item,index) in products" :key="index">
					<div class="card">
						<div :id="'car'+item.id" class="carousel slide" data-ride="carousel">
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
							<h4 class="card-title" @click="productPage(item.id)">{{ item.name }}</h4>
							<div class="card-text" @click="getProducts()">{{ item.price / 100 }} Lei</div>
							<div class="row justify-content-end">
								<button class="btn btn-primary" @click="removeProduct(item.id)" type="submit">Remove</button>
							</div>
						</div>
					</div>
				</div>
			</div>
			
			<h2>Create Category</h2>
			<input v-model="testCategoryToAdd" placeholder="Category Name">
		</form>
		<button class="btn" type="button" @click="createCategory()">Create Category</button>
	</div>
</template>

<script>

var Loading = require('../Loading.vue');
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
class asset {
	constructor (id, name, image, price){
		this.id = id;
		this.name = name;
		this.image = image;
		this.price = price;
	}
}
module.exports = {
	name: 'ControlPanel',

	components: {
		Loading
	},
	
	data() {
		return {
			testId:0,
			testName:'',
			testCategories:[''],
			testPrice:0,
			testCategory:'',
			testCategoryToAdd:'',
			testStock:0,
			testSize:'',
			testColors:'',
			name:'',

			Categories: [],
			products: [],

			CategoriesToSend:[],
			CategoriesToShow:[],

			ColorsToShow:[],
			ColorsToSend:[],

			SizesToShow:[],
			SizesToSend:[],

			productName:'',
			productToChange:'',
		};
	},

	async created() {
		let state = await this.$store.dispatch('category/all');
		console.log('NOTOKAY');

		if(state){
			console.log(state);

			for(let category of state) {
				this.Categories.push(category.name);
			}

			this.Categories.sort();
		}

		let products = await this.$store.dispatch('product/get30', 1);

		for(let product of products) {
			this.products.push(new asset(product.id, product.name, '//placehold.id/200', product.price));
		}
	},

	methods: {
		addCategory(){
			this.CategoriesToShow.push(this.testCategory);
			this.CategoriesToSend.push(this.testCategory);
		},
		addSize(){
			this.SizesToShow.push(this.testSize);
			this.SizesToSend.push(this.testSize);
		},
		addColor(){
			this.ColorsToShow.push(this.testColors);
			this.ColorsToSend.push(this.testColors);
		},
		popCategory(item) {
			var index = this.CategoriesToShow.indexOf(item);

			if(index > -1) {
				this.CategoriesToShow.splice(index, 1);
				this.CategoriesToSend.splice(index, 1);
			}
		},
		popColor(item) {
			var index = this.ColorsToShow.indexOf(item);

			if(index > -1) {
				this.ColorsToShow.splice(index, 1);
				this.ColorsToSend.splice(index, 1);
			}
		},
		popSize(item) {
			var index = this.SizesToShow.indexOf(item);

			if(index > -1) {
				this.SizesToShow.splice(index, 1);
				this.SizesToSend.splice(index, 1);
			}
		},

		async createCategory() {
			await this.$store.dispatch('category/create', this.testCategoryToAdd);
		},

		async createProduct() {
			console.log(this.ColorsToSend);
			console.log(this.SizesToSend);
			await this.$store.dispatch('product/create',{
				name:this.testName, 
				price:this.testPrice, 
				stock:this.testStock, 
				categories:this.CategoriesToSend,
				colors:this.ColorsToSend,
				sizes:this.SizesToSend,
			});
		},
		
		async removeProduct(idToDelete) {
			await this.$store.dispatch('product/delete', idToDelete);
		}
	}
};

</script>