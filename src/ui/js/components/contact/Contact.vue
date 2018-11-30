
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
		<li class="nav-item active">
		<a class="nav-link" href="contact.html">Contact</a>
      </li>
    </ul>
  </div>
</nav>
	<div class="row">
		<div class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
			<div class="box-part text-center">
                <button class="btn btn-block btn-social btn-instagram"></button>
				<div class="title">
					<h4>Instagram</h4>
				</div>
				<div class="text">
					<span>Lorem ipsum dolor sit amet, id quo eruditi eloquentiam. Assum decore te sed. Elitr scripta ocurreret qui ad.</span>
				</div>
				<a href="#">Learn More</a>
			</div>
		</div>
		<div class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
			<div class="box-part text-center">
				<button class="btn btn-block btn-social btn-twitter"></button>
				<div class="title">
					<h4>Twitter</h4>
				</div>
                 <div class="text">
					<span>Lorem ipsum dolor sit amet, id quo eruditi eloquentiam. Assum decore te sed. Elitr scripta ocurreret qui ad.</span>
				</div>
                <a href="#">Learn More</a>     
			</div>
		</div>

		<div class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
			<div class="box-part text-center">
				<button class="btn btn-md btn-fb"><i class="fa fa-facebook pr-1"></i> Facebook</button>
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