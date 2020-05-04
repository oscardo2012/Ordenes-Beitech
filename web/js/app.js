const urlAPI = "http://localhost:8000/api";
const router = new VueRouter({
	base: "rutas",
	routes:[
		{
			path: '/',
			name: 'ruta-raiz',
			component: CrearOrden
		},{
			path: '/orden/crear',
			name: 'ruta-crear-orden',
			component: CrearOrden
		},{
			path: '/orden/listar',
			name: 'ruta-listar-ordenes',
			component: ListarOrdenes
		}
	]
});

var app = new Vue({
	el: "#app",
	router,
	data:{
		modalMostrar: false,
	},
	methods:{
		actualizarEstadoModal(valor){
			this.modalMostrar = valor;
		},
	}
});