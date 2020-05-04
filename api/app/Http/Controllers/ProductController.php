<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\CustomerProduct;
use App\Product;

class ProductController extends Controller
{
	public function getProductosCliente($id){
		//Retorna el listado productos permitidos para el cliente.
		$jsonRespuesta = json_decode('{}');
		$productosCliente = CustomerProduct::where('customer_id',$id)
											->orderBy('product_id','asc')
											->with('product')
											->get();
		if(empty($productosCliente) || $productosCliente->count() <= 0){
			//Productos permitidos no encontrados.
			$jsonRespuesta = [
				'error-mensaje' => 'No hay productos permitidos para ese cliente.',
				'error-codigo' => "PC-1"
			];
		}
		else{
			//Productos permitidos encontrados.
			$jsonRespuesta = [
				'exito-codigo' => "PC-2",
				'exito-mensaje' => "Se encontraron " . $productosCliente->count() . " productos para el cliente.",
				'products' => $productosCliente
			];
		}
		return response()->json($jsonRespuesta, 200);
	}
}
