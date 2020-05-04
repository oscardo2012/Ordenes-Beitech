<?php

use Illuminate\Http\Request;

Route::group(['prefix' => 'clientes'], function(){
	Route::get('/',[
		'as'	=>	'apiGetClientes',
		'uses'	=>	'CustomerController@getClientes'
	]);
	Route::post('/ordenes',[
		'as'	=>	'apiGetClienteOrdenes',
		'uses'	=>	'CustomerController@getOrdenesClienteFecha'
	]);
});

Route::group(['prefix' => 'productos'], function(){
	Route::get('/cliente/{id}',[
		'as'	=>	'apiGetProductosClient',
		'uses'	=>	'ProductController@getProductosCliente'
	])->where('id', '[0-9]+');
});

Route::group(['prefix' => 'ordenes'], function(){
	Route::post('/guardar',[
		'as' => 'apiGuardarOrden',
		'uses' => 'OrderController@guardarOrden'
	]);
});
