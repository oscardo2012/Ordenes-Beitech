<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Carbon\Carbon;

use App\Order;
use App\OrderDetail;

define("CANTIDAD_MAXIMA_PRODUCTOS", 5);

class OrderController extends Controller
{
	public function guardarOrden(Request $req){
		$codigoRespuesta = '';
		$jsonRespuesta = json_decode('{}');
		
		if(empty($req->customer) || empty($req->productos) || count($req->productos) <= 0){
			$codigoRespuesta = 400;
			$jsonRespuesta = [
				'error-mensaje' => 'Los parámetros están incompletos',
				'error-codigo' => "GO-1"
			];
		}
		else{
			$contProductos = 0;
			foreach($req->productos as $indice => $producto){
				$contProductos += $producto["quantity"];
			}

			if($contProductos > CANTIDAD_MAXIMA_PRODUCTOS){
				$codigoRespuesta = 200;
				$jsonRespuesta = [
					'error-mensaje' => 'La cantidad de productos no puede ser más de ' . CANTIDAD_MAXIMA_PRODUCTOS . '.',
					'error-codigo' => "GO-2"
				];
			}
			else{
				$nuevaOrden = new Order();
				$fechaActual = Carbon::now()->format('Y-m-d');
				$nuevaOrden->customer_id = $req->customer;
				$nuevaOrden->creation_date = $fechaActual;
				$nuevaOrden->delivery_address = $req->delivery_address;
				$nuevaOrden->total = 0;
				$nuevaOrden->save();
				$valorTotalOrden = 0;
				foreach($req->productos as $indice => $producto){
					$valorTotalOrden += $producto['price'];
					$nuevoDetalleOrden = new OrderDetail();
					$nuevoDetalleOrden->order_id = $nuevaOrden->order_id;
					$nuevoDetalleOrden->product_id = $producto['product_id'];
					$nuevoDetalleOrden->product_description = $producto['product_description'];
					$nuevoDetalleOrden->price = $producto['price'];
					$nuevoDetalleOrden->quantity = $producto['quantity'];
					$nuevoDetalleOrden->save();
				}
				$nuevaOrden->total = $valorTotalOrden;
				$nuevaOrden->save();
			}
			$codigoRespuesta = 200;
			$jsonRespuesta = [
				'exito-codigo' => "GO-3",
				'exito-mensaje' => "Se ha creado la orden correctamente."
			];


		}
		return response()->json($jsonRespuesta, $codigoRespuesta);
	}
}
