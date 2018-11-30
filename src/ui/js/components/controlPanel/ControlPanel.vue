
<template>
<div class="container">
	<nav class="navbar navbar-expand-lg navbar-light bg-light">
		<a class="navbar-brand" href="dashboard.html">Red Delight</a>
	<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
		<span class="navbar-toggler-icon"></span>
	</button>

		<div class="collapse navbar-collapse" id="navbarSupportedContent">
			<ul class="navbar-nav mr-auto">
			<li class="nav-item active">
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
		</div>
	</nav>
	<div>Add Product</div>
	<div>Remove Product</div>
	<div>Change Product</div>
</div>
</template>

<script>

var Loading = require('../Loading.vue');

module.exports = {
	name: 'ControlPanel',

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