<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;

class AuthSecurityTest extends TestCase
{
    use RefreshDatabase;

    public function test_sql_injection_payload_cannot_bypass_login(): void
    {
        User::factory()->create([
            'username' => 'validuser',
            'email' => 'valid@example.com',
            'password' => Hash::make('secret123'),
            'role' => User::ROLE_USER,
        ]);

        $response = $this->postJson('/api/login', [
            'login' => "' OR '1'='1",
            'password' => "' OR '1'='1",
        ]);

        $response->assertUnauthorized()
            ->assertJson(['message' => 'Invalid credentials.']);

        $this->assertDatabaseHas('activity_logs', [
            'action' => 'login_failed',
        ]);
    }

    public function test_valid_login_returns_token_and_logs_activity(): void
    {
        $user = User::factory()->create([
            'username' => 'testadmin',
            'email' => 'admin@example.com',
            'password' => Hash::make('password'),
            'role' => User::ROLE_ADMIN,
        ]);

        $response = $this->postJson('/api/login', [
            'login' => 'testadmin',
            'password' => 'password',
        ]);

        $response->assertOk()
            ->assertJsonStructure(['token', 'user_data']);

        $this->assertDatabaseHas('activity_logs', [
            'user_id' => $user->id,
            'action' => 'login',
        ]);
    }

    public function test_customer_cannot_manage_users(): void
    {
        $customer = User::factory()->create(['role' => User::ROLE_USER]);
        $token = $customer->createToken('test')->plainTextToken;

        $this->withToken($token)
            ->getJson('/api/users')
            ->assertForbidden();
    }

    public function test_admin_can_create_user_with_hashed_password(): void
    {
        $admin = User::factory()->create(['role' => User::ROLE_ADMIN]);
        $token = $admin->createToken('test')->plainTextToken;

        $response = $this->withToken($token)->postJson('/api/users', [
            'fullname' => 'New Customer',
            'username' => 'newcustomer',
            'email' => 'new@example.com',
            'password' => 'password123',
            'password_confirmation' => 'password123',
            'role' => User::ROLE_USER,
        ]);

        $response->assertCreated();

        $created = User::where('username', 'newcustomer')->first();
        $this->assertNotNull($created);
        $this->assertTrue(Hash::check('password123', $created->password));
        $this->assertNotSame('password123', $created->password);
    }

    public function test_logout_records_activity(): void
    {
        $user = User::factory()->create(['role' => User::ROLE_USER]);
        $token = $user->createToken('test')->plainTextToken;

        $this->withToken($token)->postJson('/api/logout')->assertOk();

        $this->assertDatabaseHas('activity_logs', [
            'user_id' => $user->id,
            'action' => 'logout',
        ]);
    }
}
