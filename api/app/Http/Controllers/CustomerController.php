<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Customer;
use App\Order;

use Carbon\Carbon;

class CustomerController extends Controller
{
	public function getClientes(){
		//Retorna el listado de clientes.
		$jsonRespuesta = json_decode('{}');
		$clientes = Customer::all();
		if(empty($clientes)){
			//Clientes no encontrados.
			$jsonRespuesta = [
				'error-mensaje' => 'No hay clientes.',
				'error-codigo' => "CC-1"
			];
		}
		else{
			//Clientes encontrados.
			$jsonRespuesta = [
				'exito-codigo' => "CC-2",
				'exito-mensaje' => "Se encontraron " . $clientes->count() . " clientes",
				'customers' => $clientes
			];
		}
		return response()->json($jsonRespuesta, 200);
	}

	public function getOrdenesClienteFecha(Request $req){
		$codigoRespuesta = '';
		$jsonRespuesta = json_decode('{}');

		if(empty($req->customer_id) || empty($req->start_date) || empty($req->end_date)){
			$codigoRespuesta = 400;
			$jsonRespuesta = [
				'error-mensaje' => 'Los parámetros están incompletos',
				'error-codigo' => "OCF-1"
			];
		}
		else{
			$ordenes = Order::where('customer_id',$req->customer_id)
							->whereBetween('creation_date',[$req->start_date,$req->end_date])
							->with('details')
							->orderBy('creation_date', 'asc')
							->get();
			if($ordenes->count() <= 0){
				//No se encontraron ordenes para el cliente en el rango de fechas
				$codigoRespuesta = 200;
				$jsonRespuesta = [
					'error-mensaje' => 'No se encontraron resultados.',
					'error-codigo' => "OCF-2"
				];
			}
			else{
				//Si se encontraron ordenes para el cliente en el rango de fechas
				$codigoRespuesta = 200;
				$jsonRespuesta = [
					'exito-codigo' => "PC-2",
					'exito-mensaje' => "Se encontraron " . $ordenes->count() . " ordenes para el cliente.",
					'orders' => $ordenes
				];
			}
		}
		return response()->json($jsonRespuesta, $codigoRespuesta)->header("Access-Control-Allow-Origin",  "*");
	}
}
