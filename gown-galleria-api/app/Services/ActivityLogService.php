<?php

namespace App\Services;

use App\Models\ActivityLog;
use App\Models\User;
use Illuminate\Http\Request;

class ActivityLogService
{
    public static function log(?User $user, string $action, ?string $description = null, ?Request $request = null): void
    {
        ActivityLog::create([
            'user_id' => $user?->id,
            'action' => $action,
            'ip_address' => $request?->ip(),
            'description' => $description,
        ]);
    }
}
