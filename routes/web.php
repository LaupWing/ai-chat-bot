<?php

use Illuminate\Support\Facades\Route;

Route::inertia('/', 'clinic')->name('home');
Route::inertia('/welcome', 'welcome')->name('welcome');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
});

require __DIR__.'/settings.php';
