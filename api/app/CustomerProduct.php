<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class CustomerProduct extends Model
{
	public $timestamps = false;
	protected $table = 'customer_product';
	protected $fillable = [
		'customer_id', 'product_id'
	];
	protected $hidden = [
		'customer_id', 'product_id'
	];

	public function customer(){
		return $this->hasOne('App\Customer','customer_id','customer_id');
	}

	public function product(){
		return $this->hasOne('App\Product','product_id','product_id');
	}
}
