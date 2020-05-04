const CrearOrden = {
	name: 'CrearOrden',
	template: `
			<plantilla-principal @mostrar-modal="mostrarModal" nuevaOrden="active">
				<div slot="tituloPagina">{{titulo}}</div>
				<div slot="contenidoPagina">
					<div class="row">
						<div class="col-lg-12">
							<div class="ibox float-e-margins">
								<div class="ibox-content">
									<form class="form-horizontal" id="formOrden">
										<div class="form-group">
											<label class="col-sm-2 control-label">Cliente: </label>
											<div class="col-sm-10">
												<select
													class="form-control m-b"
													v-model="order.customer"
													@change="buscarProductos()">
													<option value="0">Seleccione</option>
													<option
														v-for="customer of customers" 
														:value="customer.customer_id">
														{{customer.name}}
													</option>
												</select>
											</div>
										</div>

										<div class="form-group contDeliveryAddreess">
											<label class="col-sm-2 control-label">Dirección de entrega</label>
											<div class="col-sm-10">
												<input
													type="text"
													class="form-control"
													v-model="order.delivery_address">
											</div>
										</div>

										<div class="col-lg-4"  v-for="product of products">
											<div class="contact-box">
												<div class="col-sm-12">
													<h3><strong>{{product.product.name}}</strong></h3>
													<p><i class="fa fa-money"></i>$ {{product.product.price}} </p>
													<address>
														{{product.product.product_description}}
													</address>
													<div class="row">
														<div class="form-group contCantidad">
															<label class="col-sm-4 control-label">Cantidad</label>
															<div class="col-sm-8">
																<input
																	type="number"
																	class="form-control"
																	@keypress="validarNumero($event)"
																	v-model="product.product.quantity">
															</div>
														</div>
													</div>

												</div>
												<div class="clearfix"></div>
											</div>
										</div>
										<div class="form-group">
											<div class="col-sm-12 text-center">
												<button
													class="btn btn-info"
													type="button"
													v-on:click="guardarOrden()">
														Guardar
												</button>
											</div>
										</div>
									</form>
								</div>
							</div>
						</div>
					</div>
				</div>
			</plantilla-principal>
		`,
	data: function(){
		return{
			titulo: 'Nueva Orden',
			cantMaxProd: 5,
			customers:[],
			products:[],
			order:{
				customer: 0,
				delivery_address: ""
			}
		}
	},
	mounted: function(){
		//Buscar los clientes para mostrar en el select
		this.mostrarModal(true);
		axios.get(urlAPI + "/clientes")
		.then(respuesta => {
			let datosRespuesta = respuesta.data;
			this.mostrarModal(false);
			if(typeof datosRespuesta['exito-mensaje'] != "undefined" && datosRespuesta['exito-mensaje'] != ""){
				this.customers = datosRespuesta.customers;
			}
			else{
				alert(datosRespuesta['error-mensaje']);
			}
		})
		.catch(e => {
			if(e.message != 'Network Error'){
				alert("Se ha producido un error, intente nuevamente.");	
			}
			else{
				alert("No se puede establecer conexión con el API.");
			}
			this.mostrarModal(false);
			console.log(e);
		});
	},
	methods: {
		mostrarModal(valor){
			this.$emit('mostrar-modal',valor);
		},
		buscarProductos(){			
			let clienteId = this.order.customer;
			if(clienteId){
				this.mostrarModal(true);
				axios.get(urlAPI + "/productos/cliente/" + clienteId)
				.then(respuesta => {
					let datosRespuesta = respuesta.data;
					this.mostrarModal(false);
					if(typeof datosRespuesta['exito-mensaje'] != "undefined" && datosRespuesta['exito-mensaje'] != ""){
						this.products = datosRespuesta.products;
					}
					else{
						alert(datosRespuesta['error-mensaje']);
					}
				})
				.catch(e => {
					if(e.message != 'Network Error'){
						alert("Se ha producido un error, intente nuevamente.");	
					}
					else{
						alert("No se puede establecer conexión con el API.");
					}
					this.mostrarModal(false);
					console.log(e);
				});
			}
			
		},
		validarNumero(evento){
			evento = (evento)?evento:window.event;
			var charCode = (evento.which)?evento.which:evento.keyCode;
			if((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
				evento.preventDefault();
			}
			else{
				return true;
			}
		},
		guardarOrden(){
			$(".has-error").removeClass("has-error");
			let contProd = 0;
			for(product of this.products){
				let tmpCant = (product.product.quantity)?parseInt(product.product.quantity):0;
				contProd += tmpCant;
			}

			if(this.order.delivery_address.trim() == ""){
				$(".contDeliveryAddreess").addClass("has-error");
				alert("Ingrese una dirección de entrega");
				return false;
			}

			if(contProd == 0){
				alert("Ingrese una cantidad de productos válida");
				$(".contCantidad").addClass("has-error");
			}
			else if(contProd <= this.cantMaxProd){
				this.mostrarModal(true);
				let cont = 0;
				this.order.productos = [];
				for(product of this.products){
					let tmpCant = (product.product.quantity)?parseInt(product.product.quantity):0;
					if(tmpCant){
						cont++;
						this.order.productos.push(product.product);
					}
				}
				
				axios.post(urlAPI + "/ordenes/guardar", this.order)
				.then(respuesta => {
					let datosRespuesta = respuesta.data;
					if(typeof datosRespuesta['exito-mensaje'] != "undefined" && datosRespuesta['exito-mensaje'] != ""){
						this.products = [];
						this.order.customer = 0;
						this.order.delivery_address = "";
						this.order.productos = "";
						alert(datosRespuesta['exito-mensaje']);
					}
					else{
						alert(datosRespuesta['error-mensaje']);
					}
					this.mostrarModal(false);
					
				})
				.catch(e => {
					if(e.message != 'Network Error'){
						alert("Se ha producido un error, intente nuevamente.");	
					}
					else{
						alert("No se puede establecer conexión con el API.");
					}
					this.mostrarModal(false);
					console.log(e);
				});
			}
			else{
				alert("La cantidad máxima de productos es " + this.cantMaxProd);
				$(".contCantidad").addClass("has-error");
			}
		}
	},
	watch: {}
}