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
	<p>penis</p>
	<div class="col-md-3" >
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
      <div class="card-text">${{ product.price / 100 }}</div>
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
module.exports = {
	name: 'Shop',
	created(){
		this.id = urlParams.get('id');
		if(this.id=='1'){
			this.product = new asset('1', 'Loreeeem ipsum', '//placehold.it/200',  '999');
		} else if(this.id=='2'){
			this.product = new asset('2', 'Loremmmm', '//placehold.it/200',  '1499');
		} else if(this.id=='3'){
			this.product = new asset('3', 'Ipsum', '//placehold.it/200',  '499');
		} else if(this.id=='4'){
			this.product = 	new asset('4', 'Loremipsum', '//placehold.it/200',  '299');
		} else if(this.id=='5'){
			this.product = 	new asset('5', 'LoremIpsum', '//placehold.it/200',  '699');
		}
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
