<?php
use Acme\Settings\Models\Address;
use Illuminate\Http\Request;

Route::prefix('/api')->group(function () {

  Route::get('/check-cookie/', function () {
    $hasCookie = Cookie::get('selected_city');
    return response()->json($hasCookie);
  });

  Route::post('/select-city/', function (Request $request) {
    $id = $request->city_id;
    $cookie = Cookie::forever('selected_city', $id);
    Cookie::queue($cookie);
  })->middleware('web');

  Route::get('/get-city/{id}', function ($id) {
    $data = Address::findOrFail((int)$id);
    return response()->json($data, 200);
  });
});


