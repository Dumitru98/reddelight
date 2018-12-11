
<template>
<div class="container">
	<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <a class="navbar-brand" href="dashboard.html">Red Delight</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item ">
		<a class="nav-link" href="dashboard.html">Dashboard</a>
      </li>
      <li class="nav-item">
		<a class="nav-link" href="shop.html">Shop</a>
      </li>
      <li class="nav-item active">
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
<div class="row" v-if="hasItems">
<div class="col-md-3" v-for="(item,index) in shoppingCart" :key="index">
  <div class="card">
    <div :id="'car'+item.id" class="carousel slide" data-ride="carousel">
		<div class="carousel-inner">
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
      <h4 class="card-title">{{ item.name }}</h4>
      <div class="card-text">${{ item.price / 100 }}</div>
      <div class="row justify-content-end">
        <button class="btn btn-primary">Remove from cart</button>
      </div>
    </div>
  </div>
</div>
</div>
	<form>
		<h2>Detalii Personale</h2>
		<input placeholder="Nume">
		<input placeholder="Prenume">
		<input placeholder="Email">
		<input placeholder="Telefon">
		<h2>Detalii Livrare</h2>
		<input placeholder="Judet">
		<input placeholder="Oras">
		<input placeholder="Adresa">
	</form>
	<button class="btn btn-primary">Comanda</button>
</div>
</template>

<script>

var Loading = require('../Loading.vue');

module.exports = {
	name: 'CommandPage',

	components: {
		Loading
	},
	
	data() {

		return {
			hasItems: false,
			shoppingCart:[{
				id:'',
				name:'',
				price:'',
				image:'',
			}]
			
		};
	},

	methods: {
		
	}
};

</script>