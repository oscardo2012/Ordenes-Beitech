<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{
	public $timestamps = false;
	protected $table = 'customer';
	protected $primaryKey = 'customer_id';
	protected $fillable = [
		'name', 'email'
	];
}
