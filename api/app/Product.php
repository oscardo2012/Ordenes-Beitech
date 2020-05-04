<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
	public $timestamps = false;
	protected $table = 'product';
	protected $primaryKey = 'product_id';
	protected $fillable = [
		'name', 'product_description', 'price'
	];
}
