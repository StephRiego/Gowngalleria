<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        User::updateOrCreate(
            ['email' => 'admin@gowngalleria.com'],
            [
                'name' => 'Admin User',
                'username' => 'admin',
                'password' => 'password',
                'role' => User::ROLE_ADMIN,
                'status' => 'active',
            ]
        );

        User::updateOrCreate(
            ['email' => 'user@gowngalleria.com'],
            [
                'name' => 'Shop User',
                'username' => 'shopuser',
                'password' => 'password',
                'role' => User::ROLE_USER,
                'status' => 'active',
            ]
        );
    }
}
