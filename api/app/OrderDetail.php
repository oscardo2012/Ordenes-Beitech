<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class OrderDetail extends Model
{
	public $timestamps = false;
	protected $table = 'order_detail';
	protected $primaryKey = 'order_detail_id';
	protected $with = ['product'];
	protected $fillable = [
		'order_id', 'product_id', 'product_description', 'price', 'quantity'
	];

	public function product(){
		return $this->hasOne('App\Product','product_id','product_id');
	}
}
