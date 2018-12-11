
<template>
<div class="container">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
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
		<li class="nav-item active">
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
	<div class="row" align="center">
		<div class="col-lg-4 col-md-4 col-sm-4 col-xs-12" align="center">
			<div class="box-part text-center">
				<a href="#" class="fa fa-instagram"></a>
				<div class="title">
					<h4>Instagram</h4>
				</div>
				<div class="text">
					<span>Lorem ipsum dolor sit amet, id quo eruditi eloquentiam. Assum decore te sed. Elitr scripta ocurreret qui ad.</span>
				</div>
				<a href="#">Learn More</a>
			</div>
		</div>

		<div class="col-lg-4 col-md-4 col-sm-4 col-xs-12" align="center">
			<div class="box-part text-center">
				<a href="#" class="fa fa-facebook"></a>
				<div class="title">
					<h4>Facebook</h4>
				</div>
				<div class="text">
					<span>Lorem ipsum dolor sit amet, id quo eruditi eloquentiam. Assum decore te sed. Elitr scripta ocurreret qui ad.</span>
				</div>
				<a href="#">Learn More</a>
			</div>
		</div>
	</div>
</div>
</template>

<script>

var Loading = require('../Loading.vue');

module.exports = {
	name: 'Contact',

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