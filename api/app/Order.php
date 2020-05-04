<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
	public $timestamps = false;
	protected $table = 'order';
	protected $primaryKey = 'order_id';
	protected $fillable = [
		'customer_id', 'creation_date', 'delivery_address', 'total'
	];

	public function details(){
		return $this->hasMany('App\OrderDetail','order_id','order_id');
	}
}
