<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Services\ActivityLogService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class UserController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $search = (string) $request->query('search', '');
        $page = max(1, (int) $request->query('page', 1));
        $perPage = 10;

        $query = User::query()->orderByDesc('created_at');

        if ($search !== '') {
            $escaped = str_replace(['%', '_'], ['\\%', '\\_'], $search);
            $query->where(function ($builder) use ($escaped) {
                $builder->where('name', 'like', "%{$escaped}%")
                    ->orWhere('email', 'like', "%{$escaped}%")
                    ->orWhere('username', 'like', "%{$escaped}%")
                    ->orWhere('role', 'like', "%{$escaped}%");
            });
        }

        $paginated = $query->paginate($perPage, ['*'], 'page', $page);

        return response()->json([
            'data' => collect($paginated->items())->map(fn (User $user) => $this->formatUser($user)),
            'last_page' => $paginated->lastPage(),
            'current_page' => $paginated->currentPage(),
        ]);
    }

    public function store(Request $request): JsonResponse
    {
        $actor = $request->user();
        $allowedRoles = $this->assignableRoles($actor);

        $data = $request->validate([
            'fullname' => ['required', 'string', 'max:255'],
            'username' => ['required', 'string', 'max:50', 'alpha_dash', 'unique:users,username'],
            'email' => ['required', 'email', 'max:255', 'unique:users,email'],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
            'role' => ['required', Rule::in($allowedRoles)],
            'status' => ['sometimes', Rule::in(['active', 'inactive'])],
        ]);

        $user = User::create([
            'name' => $data['fullname'],
            'username' => $data['username'],
            'email' => $data['email'],
            'password' => $data['password'],
            'role' => $data['role'],
            'status' => $data['status'] ?? 'active',
        ]);

        ActivityLogService::log($actor, 'user_created', "Created user {$user->username}", $request);

        return response()->json([
            'message' => 'User created successfully.',
            'data' => $this->formatUser($user),
        ], 201);
    }

    public function update(Request $request, User $user): JsonResponse
    {
        $actor = $request->user();
        $allowedRoles = $this->assignableRoles($actor);

        if (! $this->canManageTarget($actor, $user)) {
            return response()->json(['message' => 'Forbidden access.'], 403);
        }

        $data = $request->validate([
            'fullname' => ['sometimes', 'required', 'string', 'max:255'],
            'username' => [
                'sometimes',
                'required',
                'string',
                'max:50',
                'alpha_dash',
                Rule::unique('users', 'username')->ignore($user->id),
            ],
            'email' => [
                'sometimes',
                'required',
                'email',
                'max:255',
                Rule::unique('users', 'email')->ignore($user->id),
            ],
            'password' => ['nullable', 'string', 'min:8', 'confirmed'],
            'role' => ['sometimes', Rule::in($allowedRoles)],
            'status' => ['sometimes', Rule::in(['active', 'inactive'])],
        ]);

        if (isset($data['role']) && $user->id === $actor->id && $data['role'] !== $actor->role) {
            return response()->json(['message' => 'You cannot change your own role.'], 422);
        }

        if (isset($data['fullname'])) {
            $user->name = $data['fullname'];
        }
        if (isset($data['username'])) {
            $user->username = $data['username'];
        }
        if (isset($data['email'])) {
            $user->email = $data['email'];
        }
        if (isset($data['role'])) {
            $user->role = $data['role'];
        }
        if (isset($data['status'])) {
            $user->status = $data['status'];
        }
        if (! empty($data['password'])) {
            $user->password = $data['password'];
        }

        $user->save();

        ActivityLogService::log($actor, 'user_updated', "Updated user {$user->username}", $request);

        return response()->json([
            'message' => 'User updated successfully.',
            'data' => $this->formatUser($user->fresh()),
        ]);
    }

    public function destroy(Request $request, User $user): JsonResponse
    {
        $actor = $request->user();

        if ($user->id === $actor->id) {
            return response()->json(['message' => 'You cannot delete your own account.'], 422);
        }

        if (! $this->canManageTarget($actor, $user)) {
            return response()->json(['message' => 'Forbidden access.'], 403);
        }

        $username = $user->username;
        $user->delete();

        ActivityLogService::log($actor, 'user_deleted', "Deleted user {$username}", $request);

        return response()->json(['message' => 'User deleted successfully.']);
    }

    /** @return list<string> */
    private function assignableRoles(User $actor): array
    {
        if ($actor->role === User::ROLE_SUPERADMIN) {
            return [User::ROLE_SUPERADMIN, User::ROLE_ADMIN, User::ROLE_USER];
        }

        return [User::ROLE_ADMIN, User::ROLE_USER];
    }

    private function canManageTarget(User $actor, User $target): bool
    {
        if ($actor->role === User::ROLE_SUPERADMIN) {
            return true;
        }

        return $target->role !== User::ROLE_SUPERADMIN;
    }

    private function formatUser(User $user): array
    {
        return [
            'id' => $user->id,
            'fullname' => $user->name,
            'name' => $user->name,
            'username' => $user->username,
            'email' => $user->email,
            'role' => $user->role,
            'status' => $user->status,
            'created_at' => $user->created_at?->toIso8601String(),
        ];
    }
}
