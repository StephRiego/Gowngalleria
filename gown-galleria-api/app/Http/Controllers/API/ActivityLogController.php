<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\ActivityLog;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ActivityLogController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $perPage = min(50, max(5, (int) $request->query('per_page', 15)));

        $paginated = ActivityLog::query()
            ->with('user:id,name,username,email,role')
            ->orderByDesc('created_at')
            ->paginate($perPage);

        $data = collect($paginated->items())->map(fn (ActivityLog $log) => [
            'id' => $log->id,
            'user_id' => $log->user_id,
            'user' => $log->user ? [
                'id' => $log->user->id,
                'fullname' => $log->user->name,
                'username' => $log->user->username,
                'email' => $log->user->email,
                'role' => $log->user->role,
            ] : null,
            'activity' => $log->action,
            'description' => $log->description,
            'ip_address' => $log->ip_address,
            'timestamp' => $log->created_at?->toIso8601String(),
        ]);

        return response()->json([
            'data' => $data,
            'current_page' => $paginated->currentPage(),
            'last_page' => $paginated->lastPage(),
        ]);
    }
}
