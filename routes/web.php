<?php

use App\Http\Controllers\TodoController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return redirect()->route('index.todos');
});

Route::get('/todos', [TodoController::class, 'index'])->name('index.todos');
Route::post('/todos', [TodoController::class, 'store'])->name('store.todos');
Route::put('/todos/{todo}', [TodoController::class, 'update'])->name('update.todos');
Route::put('/todos/{todo}/{status}', [TodoController::class, 'updateStatus'])->name('updateStatus.todos');
Route::delete('/todos/{todo}', [TodoController::class, 'destroy'])->name('destroy.todos');