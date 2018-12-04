
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
    </ul>
    <form class="form-inline my-2 my-lg-0">
      <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" v-model="searchToken" >
      <button class="btn btn-outline-success my-2 my-sm-0" type="button">Search</button>
    </form>
  </div>
</nav>
<div class="row">
<div class="col-md-3" v-for="(item,index) in filteredItems" :key="index">
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
        <button class="btn btn-primary">Add to cart</button>
      </div>
    </div>
  </div>
</div>
</div>
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
module.exports = {
	name: 'Shop',

	components: {
		Loading
	},
	
	data() {
		return {
			searchToken:'',
			forSale : [
				new asset('1', 'Loreeeem ipsum', '//placehold.it/200',  '999'),
				new asset('2', 'Loremmmm', '//placehold.it/200',  '1499'),
				new asset('3', 'Ipsum', '//placehold.it/200',  '499'),
				new asset('4', 'Loremipsum', '//placehold.it/200',  '299'),
				new asset('5', 'LoremIpsum', '//placehold.it/200',  '699')
			],
			noSearch:true,
		};
	},
	computed: {
		filteredItems() {
			return this.forSale.filter( item => {
				return item.name.toLowerCase().includes(this.searchToken.toLowerCase());
			});
		},
	}
};

</script>