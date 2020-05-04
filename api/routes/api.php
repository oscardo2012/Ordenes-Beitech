<?php

use Illuminate\Http\Request;

Route::group(['prefix' => 'clientes', 'middleware' => ['cors']], function(){
	Route::get('/',[
		'as'	=>	'apiGetClientes',
		'uses'	=>	'CustomerController@getClientes'
	]);
	Route::post('/ordenes',[
		'as'	=>	'apiGetClienteOrdenes',
		'uses'	=>	'CustomerController@getOrdenesClienteFecha'
	]);
});

Route::group(['prefix' => 'productos', 'middleware' => ['cors']], function(){
	Route::get('/cliente/{id}',[
		'as'	=>	'apiGetProductosClient',
		'uses'	=>	'ProductController@getProductosCliente'
	])->where('id', '[0-9]+');
});

Route::group(['prefix' => 'ordenes', 'middleware' => ['cors']], function(){
	Route::post('/guardar',[
		'as' => 'apiGuardarOrden',
		'uses' => 'OrderController@guardarOrden'
	]);
});
