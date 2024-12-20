<?php

use App\Http\Controllers\FileController;
use App\Http\Controllers\FolderController;
use Illuminate\Support\Facades\Route;


Route::apiResource('folders', FolderController::class);
Route::get('folders/{id}/subfolder', [FolderController::class, 'showChildren']);

Route::apiResource('files', FileController::class);
