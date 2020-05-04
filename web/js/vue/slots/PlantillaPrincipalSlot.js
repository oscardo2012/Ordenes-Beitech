Vue.component('plantilla-principal',{
	name: "PlantillaPrincipalSlot",
	props: ["nuevaOrden","listaOrdenes"],
	template: `
		<div id="wrapper">
			<nav class="navbar-default navbar-static-side" role="navigation">
				<div class="sidebar-collapse">
					<ul class="nav" id="side-menu">
						<li class="nav-header">
							<div class="logo-element">
							<i class="fa fa-star"></i>
							</div>
						</li>
						<li :class="nuevaOrden">
							<a v-on:click="irA('ruta-crear-orden')">
								<i class="fa fa-shopping-basket"></i>
								<span class="nav-label">Crear nueva orden</span>
							</a>
						</li>
						<li :class="listaOrdenes">
							<a v-on:click="irA('ruta-listar-ordenes')">
								<i class="fa fa-list-ol"></i>
								<span class="nav-label">Lista de ordenes</span>
							</a>
						</li>
					</ul>
				</div>
			</nav>

			<div id="page-wrapper" class="gray-bg">
				<div class="row border-bottom">
					<nav class="navbar navbar-static-top" role="navigation" style="margin-bottom: 0">
						<div class="navbar-header">
							<a class="navbar-minimalize minimalize-styl-2 btn btn-primary " href="#">
								<i class="fa fa-bars"></i>
							</a> 
						</div>
					</nav>
				</div>

				<div class="row wrapper border-bottom white-bg page-heading">
					<div class="col-sm-12">
						<h2>
							<slot name="tituloPagina"></slot>
						</h2>
					</div>
				</div>

				<div class="wrapper wrapper-content">
					<slot name="contenidoPagina"></slot>
				</div>
				
				<div class="footer">
					<div>
						<strong>Desarrollado por</strong> Oscar Fernando Espinosa Rocha
					</div>
				</div>
			</div>
		</div>
	`,
	data: function(){
		return {}
	},
	methods:{
		mostrarModal(valor){
			this.$emit('mostrar-modal',valor);
		},
		irA(nombreRuta){
			if(nombreRuta != this.$route.name){
				this.$router.push({name: nombreRuta});
			}
		},
	}
});