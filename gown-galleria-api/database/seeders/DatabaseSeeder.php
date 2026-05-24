<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $accounts = [
            [
                'email' => 'superadmin@gowngalleria.com',
                'username' => 'superadmin',
                'name' => 'Super Admin',
                'role' => User::ROLE_SUPERADMIN,
            ],
            [
                'email' => 'admin@gowngalleria.com',
                'username' => 'admin',
                'name' => 'Admin User',
                'role' => User::ROLE_ADMIN,
            ],
            [
                'email' => 'user@gowngalleria.com',
                'username' => 'shopuser',
                'name' => 'Shop User',
                'role' => User::ROLE_USER,
            ],
        ];

        foreach ($accounts as $account) {
            User::updateOrCreate(
                ['email' => $account['email']],
                [
                    'name' => $account['name'],
                    'username' => $account['username'],
                    'password' => 'password',
                    'role' => $account['role'],
                    'status' => 'active',
                ],
            );
        }
    }
}
