
<template>
<div class="container">
	<nav class="navbar navbar-expand-lg navbar-light bg-light">
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
	<form>
		<h2>Add Product</h2>
		<input v-model="testid" placeholder="Id">
		<input v-model="testname" placeholder="Name">
		<select v-model="testCategory">
			<option v-for="(item,index) in Categories" :key=index :value="item">{{item}}</option>
		</select>
		<ul>
			<li v-for="(category, index) in CategoriesToShow" :key="index">
				<p>{{category}}<button type="button" @click="outWithCategory(category)">x</button></p>
			</li>
		</ul>
		<button @click="addCategory" class="btn" type="button">Add Category</button>
		
		<input v-model="testprice" placeholder="Price">
	</form>
	<button class="btn btn-outline-success my-2 my-sm-0" type="button" @click="functie()">Add Product</button>
	<form>
		<h2>Remove Product</h2>
		<input v-model="productName" placeholder="Product Name">
	</form>
	<button class="btn btn-outline-success my-2 my-sm-0" type="button" @click="functie()">Remove Product</button>
	<form>
		<h2>Create Category</h2>
		<input v-model="this.testCategory" placeholder="Category Name">
	</form>
	<button class="btn btn-outline-success my-2 my-sm-0" type="button" @click="createCategory()">Create Category</button>
</div>
</template>

<script>

var Loading = require('../Loading.vue');
class Product {
	constructor(category, name,stock,price){
		this.category = category;
		this.name = name;
		this.stock = stock;
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
			testname:'',
			testCategories:[''],
			testPrice:'',
			testCategory:'',
			testStock:'',

			Categories:[
				'sexy',
				'not sexy',
				'meh',
				'tzatze mari'
			],
			CategoriesToSend:[],
			CategoriesToShow:[],

			productName:'',
			productToChange:'',
			
			product:{
				id:'',
				name:'',
				categoryList:[],	
				price:''
			}
		};
	},

	methods: {
		addCategory(){
			this.CategoriesToSend.push(this.testCategory);
			this.CategoriesToShow.push(this.testCategory);
		},
		outWithCategory(category) {
			var index = this.CategoriesToShow.indexOf(category);
			if(index > -1) {
				this.CategoriesToShow.splice(index, 1);
				this.CategoriesToSend.splice(index, 1);
			}
		},
		async createCategory() {
			await this.$store.dispatch('category/create', this.testCategory);
			return new Product;
		}
		
	}
};

</script>