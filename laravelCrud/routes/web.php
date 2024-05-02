<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\categoryController;


Route::get('/', function () {
    return view('welcome');
});
// cat form view
Route::get("categories",function(){
    return view("category");
});
// add catt
Route::post('categories',[categoryController::class,'addCategories']);
// view cat
Route::get('details',[categoryController::class,"viewCategories"]);
// edit cat view
Route::get('edit/{id}',[categoryController::class,"editViewCategory"]);
// update
Route::post('update',[categoryController::class,'updateCategory']);
// delete cat
Route::get('delete/{id}',[categoryController::class,'deleteCategory']);
