
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
        <a class="nav-link" href="shoppingCart.html">Shopping Cart</a>
      </li>
		<li class="nav-item">
		<a class="nav-link" href="contact.html">Contact</a>
      </li>
    </ul>
    <form class="form-inline my-2 my-lg-0">
      <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
      <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
    </form>
  </div>
</nav>
</div>
</template>

<script>

var Loading = require('../Loading.vue');

module.exports = {
	name: 'Shop',

	components: {
		Loading
	},
	
	data() {

		return {
			
		};
	},

	methods: {
		
	}
};

</script>