<?php

use App\Http\Controllers\ExtensionCaptureController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/extension/projects', [ExtensionCaptureController::class, 'projects']);
    Route::post('/extension/captures', [ExtensionCaptureController::class, 'store']);
});
