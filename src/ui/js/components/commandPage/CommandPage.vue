
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
	<button class="btn btn-primary" @click="makeCommand">Comanda</button>
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
				price:''
			}],
			
			firstName: 'Dumitru',
			lastName: 'Calin',
			email: 'dumitru.alexandru.1998@gmail.com',
			phone: '0723 573 258',
			state: 'Sector 3',
			city: 'Bucuresti',
			address: 'aleea Fizicienilor, nr. 18',
			products: [
				{
					id: '36614d9e-a4e8-4dea-acac-bf92adb006c51521e6e1-7f03-4182-ac53-2df1c9b5e6c9d16b17cf-7bbe-4eba-882c-ade22b7c46b7bf48e10d-7478-4fd9-9f08-a309609f03c0',
					name: 'many',
					price: 0.01,
					quantity: 1
				}, {
					id: '1562bdf4-b3be-4528-9396-975dea1ce9a1e6e7f168-da08-4fd3-af9c-4d58a9045b96f99a734e-4c58-44ff-b8c8-b72015a8efec7d92e92d-6367-478a-a031-df5820bac0dd',
					name: 'name',
					price: 2.99,
					quantity: 1000000
				}, {
					id: '1b9d9849-8020-4a17-b830-5f1ebc9cd42412d84ed5-ce18-4e44-afe6-024c035afbe99bba158f-209f-49aa-ac2d-ee754b03e4839cbfafb1-252f-458a-935d-424a1a3ae09a',
					name: 'asdas',
					price: 123.99,
					quantity: 10
				}
			]
		};
	},

	methods: {
		async makeCommand() {
			var command = {
				firstName: this.firstName,
				lastName: this.lastName,
				email: this.email,
				phone: this.phone,
				state: this.state,
				city: this.city,
				address: this.address,
				products: this.products
			};

			await this.$store.dispatch('user/makeCommand', command);
		}
	}
};

</script>