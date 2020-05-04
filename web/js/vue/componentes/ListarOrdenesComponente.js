const ListarOrdenes = {
	name: 'ListarOrdenes',
	template: `
			<plantilla-principal @mostrar-modal="mostrarModal" listaOrdenes="active">
				<div slot="tituloPagina">{{titulo}}</div>
				<div slot="contenidoPagina">
					<div class="row">
						<div class="col-lg-12">
							<div class="ibox float-e-margins">
								<div class="ibox-content">
									<form class="form-horizontal" id="formOrden">
										<div class="form-group col-lg-5" id="contCustomer">
											<label class="col-sm-4 control-label">Cliente: </label>
											<div class="col-sm-8">
												<select
													class="form-control m-b"
													v-model="customer">
													<option value="0">Seleccione</option>
													<option
														v-for="customer of customers" 
														:value="customer.customer_id">
														{{customer.name}}
													</option>
												</select>
											</div>
										</div>


										<div class="form-group col-lg-5" id="contSelectorFechas">
											<label class="col-sm-2 control-label">Fecha: </label>
											<div class="input-daterange col-sm-10 input-group" id="datepicker">
												<input
													data-target="1"
													type="text"
													class="input-sm form-control"
													placeholder="aaaa-mm-dd"
													name="start"/>
												<span class="input-group-addon">hasta</span>
												<input
													data-target="2"
													type="text"
													class="input-sm form-control"
													placeholder="aaaa-mm-dd"
													name="end"/>
											</div>
										</div>

										<div class="form-group col-lg-2">
											<div class="col-sm-4"></div>
											<button
												class="btn btn-info col-sm-8"
												type="button"
												v-on:click="buscarOrdenes()">
													Buscar
											</button>
										</div>

										<div class="clearfix"></div>
									</form>
								</div>
							</div>
						</div>
					</div>



					<div class="row" >
						<div class="col-lg-12">
							<div class="ibox float-e-margins">
								<div class="ibox-title">
									<h5>Resultado de la búsqueda</h5>
								</div>
								<div class="ibox-content">
									<table class="table table-striped table-bordered table-hover" id="tabla_resultados">
										<thead>
											<tr>
												<th>Fecha de Creación</th>
												<th>Id Orden</th>
												<th>Total</th>
												<th>Dirección entrega</th>
												<th>Productos</th>
											</tr>
										</thead>
										<tbody id="tBody"></tbody>
										<tfoot>
											<tr>
												<th>Fecha de Creación</th>
												<th>Id Orden</th>
												<th>Total</th>
												<th>Dirección entrega</th>
												<th>Productos</th>
											</tr>
										</tfoot>
									</table>
								</div>
							</div>
						</div>
					</div>
				</div>
			</plantilla-principal>
		`,
	data: function(){
		return{
			titulo: 'Listar Ordenes Por Cliente',
			customers: [],
			customer: 0,
			start_date: "",
			end_date: ""
			
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
				let referenciaVue = this;
				referenciaVue.customers = datosRespuesta.customers;
				$('#contSelectorFechas .input-daterange').datepicker({
					keyboardNavigation: false,
					autoclose: true,
					format: 'yyyy-mm-dd',
					todayBtn: true,
					todayHighlight: true
				}).datepicker()
					.on("changeDate", function(evento) {
						switch(evento.target.dataset.target){
							case '1':
								referenciaVue.start_date = referenciaVue.cambiarFormatoFecha(evento.date);
								break;
							case '2':
								referenciaVue.end_date = referenciaVue.cambiarFormatoFecha(evento.date);
								break;
						}
				});
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
		cambiarFormatoFecha(fecha){
			fecha = (fecha)?fecha.getFullYear() + "-" + 
			("0" + (fecha.getMonth() + 1)).slice(-2) + "-" + 
			("0" + fecha.getDate()).slice(-2):"";
			return fecha;
		},
		buscarOrdenes(){
			$(".has-error").removeClass("has-error");
			if(this.customer == 0){
				$("#contCustomer").addClass("has-error");
				alert("Seleccione un cliente de la lista");
				return false;
			}

			if(this.start_date == "" || this.end_date == ""){
				$("#contSelectorFechas").addClass("has-error");
				alert("Seleccione un rango de fechas válido");
				return false;
			}

			this.mostrarModal(true);
			axios.post(urlAPI + "/clientes/ordenes",{
				customer_id: this.customer,
				start_date: this.start_date,
				end_date: this.end_date
			})
			.then(respuesta => {
				let datosRespuesta = respuesta.data;
				$('#tabla_resultados').DataTable().destroy();
				let tBody = document.getElementById("tBody");
				$(tBody).empty();
				if(typeof datosRespuesta['exito-mensaje'] != "undefined" && datosRespuesta['exito-mensaje'] != ""){
					for(orden of datosRespuesta.orders){
						let trOrden = document.createElement("tr"),
							tdFechaCreacion = document.createElement("td"),
							tdId = document.createElement("td"),
							tdTotal = document.createElement("td"),
							tdDireccion = document.createElement("td"),
							tdProductos = document.createElement("td"),
							tmpProductos = "";

						tdFechaCreacion.innerHTML = orden.creation_date;
						tdId.innerHTML = orden.order_id;
						tdTotal.innerHTML = orden.total;
						tdDireccion.innerHTML = orden.delivery_address;

						for(detalle of orden.details){
							tmpProductos += detalle.quantity + " x " + detalle.product.name + "<br>";
							
						}
						tdProductos.innerHTML = tmpProductos;
						trOrden.appendChild(tdFechaCreacion);
						trOrden.appendChild(tdId);
						trOrden.appendChild(tdTotal);
						trOrden.appendChild(tdDireccion);
						trOrden.appendChild(tdProductos);
						tBody.appendChild(trOrden);
					}
					$('#tabla_resultados').dataTable({
						responsive: true,
						"dom": 'pi'
					});
				}
				else{
					alert(datosRespuesta['error-mensaje']);
					$('#tabla_resultados').DataTable().destroy();
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
	},
	watch: {}
}