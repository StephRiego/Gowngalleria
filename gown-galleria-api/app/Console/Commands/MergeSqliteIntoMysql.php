<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class MergeSqliteIntoMysql extends Command
{
    protected $signature = 'db:merge-sqlite-into-mysql';

    protected $description = 'Copy users and activity logs from SQLite into MySQL (gown_galleria_db)';

    public function handle(): int
    {
        if (config('database.default') !== 'mysql') {
            $this->error('Set DB_CONNECTION=mysql in .env before running this command.');

            return self::FAILURE;
        }

        $sqlitePath = database_path('database.sqlite');

        if (! file_exists($sqlitePath) || filesize($sqlitePath) === 0) {
            if (file_exists($sqlitePath)) {
                @unlink($sqlitePath);
                $this->info('Removed empty database/database.sqlite.');
            }

            $this->info('MySQL (gown_galleria_db) is the only database. Users: '.DB::table('users')->count());

            return self::SUCCESS;
        }

        $sqlite = new \PDO('sqlite:'.$sqlitePath);
        $sqlite->setAttribute(\PDO::ATTR_ERRMODE, \PDO::ERRMODE_EXCEPTION);

        $hasUsers = (bool) $sqlite->query(
            "SELECT 1 FROM sqlite_master WHERE type='table' AND name='users'"
        )->fetch();

        if (! $hasUsers) {
            @unlink($sqlitePath);
            $this->warn('SQLite file had no users table. Removed database.sqlite.');

            return self::SUCCESS;
        }

        $users = $sqlite->query('SELECT * FROM users')->fetchAll(\PDO::FETCH_ASSOC);
        $mergedUsers = 0;

        foreach ($users as $row) {
            $exists = DB::table('users')->where('email', $row['email'])->exists();

            DB::table('users')->updateOrInsert(
                ['email' => $row['email']],
                [
                    'name' => $row['name'],
                    'username' => $row['username'],
                    'password' => $row['password'],
                    'role' => $row['role'] ?? 'user',
                    'status' => $row['status'] ?? 'active',
                    'email_verified_at' => $row['email_verified_at'] ?? null,
                    'remember_token' => $row['remember_token'] ?? null,
                    'created_at' => $row['created_at'] ?? now(),
                    'updated_at' => $row['updated_at'] ?? now(),
                ],
            );

            if (! $exists) {
                $mergedUsers++;
            }
        }

        $mergedLogs = 0;

        if (Schema::hasTable('activity_logs')) {
            $logs = $sqlite->query('SELECT * FROM activity_logs')->fetchAll(\PDO::FETCH_ASSOC);

            foreach ($logs as $log) {
                $email = null;

                if (! empty($log['user_id'])) {
                    $sqliteUser = $sqlite
                        ->query('SELECT email FROM users WHERE id = '.(int) $log['user_id'])
                        ->fetch(\PDO::FETCH_ASSOC);
                    $email = $sqliteUser['email'] ?? null;
                }

                $mysqlUserId = $email
                    ? DB::table('users')->where('email', $email)->value('id')
                    : null;

                $duplicate = DB::table('activity_logs')
                    ->where('user_id', $mysqlUserId)
                    ->where('action', $log['action'])
                    ->where('description', $log['description'] ?? null)
                    ->where('created_at', $log['created_at'] ?? null)
                    ->exists();

                if ($duplicate) {
                    continue;
                }

                DB::table('activity_logs')->insert([
                    'user_id' => $mysqlUserId,
                    'action' => $log['action'],
                    'ip_address' => $log['ip_address'] ?? null,
                    'description' => $log['description'] ?? null,
                    'created_at' => $log['created_at'] ?? now(),
                    'updated_at' => $log['updated_at'] ?? now(),
                ]);

                $mergedLogs++;
            }
        }

        $backupPath = database_path('database.sqlite.backup');

        if (! rename($sqlitePath, $backupPath)) {
            $this->warn('Could not rename database.sqlite. Remove it manually after verifying MySQL data.');
        } else {
            $this->info("SQLite file moved to: {$backupPath}");
        }

        $this->info("Users in MySQL: ".DB::table('users')->count());
        $this->info("New users merged from SQLite: {$mergedUsers}");
        $this->info("Activity logs merged: {$mergedLogs}");
        $this->info('Done. The app now uses only MySQL (gown_galleria_db).');

        return self::SUCCESS;
    }
}
