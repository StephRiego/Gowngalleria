# GownGalleria — Security & Requirements Compliance

## 1. Login & Session

| Requirement | Implementation |
|-------------|----------------|
| Login form | React `Login.jsx` with validation |
| Logout function | `POST /api/logout` + `AuthContext.logout()` |
| Session management | Laravel Sanctum bearer tokens stored in `localStorage`; restored on page load via `GET /api/user` |
| Invalid login handling | HTTP 401 + message "Invalid credentials."; failed attempts logged |

## 2. Security

| Requirement | Implementation |
|-------------|----------------|
| Hashed passwords | Laravel `password` cast (`bcrypt`) on `User` model |
| Prepared statements | Eloquent ORM (parameter binding) — no raw SQL in auth |
| SQL injection prevention | Query builder bindings; login uses `where email/username` + `Hash::check` |
| Input validation | `$request->validate()` on all auth and user endpoints |
| No plain text passwords | Passwords never returned in API; only hashed in DB |
| SQL injection test | `tests/Feature/AuthSecurityTest.php` — `' OR '1'='1` must fail |

## 3. User Management

| Requirement | Implementation |
|-------------|----------------|
| Add user | `POST /api/users` + Superadmin UI modal |
| Edit user | `PUT /api/users/{id}` |
| Delete user | `DELETE /api/users/{id}` |
| View users | `GET /api/users` + paginated table |
| Only Admin manages users | Middleware `role:superadmin,admin` |
| Prevent unauthorized access | Sanctum + role middleware + React `ProtectedRoute` |
| Login/logout logs | `activity_logs` table via `ActivityLogService` |

## 4. Roles

| Rubric role | System role | Notes |
|-------------|-------------|--------|
| Admin | `admin` (shop admin) + `superadmin` (system owner) | Both can manage users; superadmin can assign all roles |
| User | `user` (customer) | Cannot access user management API |

## 5. CIA & AAA

- **Confidentiality**: Passwords hashed; `$hidden` on User; tokens for API access
- **Integrity**: Server-side validation; role/status checks on update/delete
- **Availability**: Graceful 401/422/403 JSON errors; login rate limit `throttle:10,1`
- **Authentication**: Sanctum token after credential verify
- **Authorization**: Role middleware per route
- **Accounting**: `activity_logs` — login, logout, login_failed, register, user CRUD

## 6. Database Tables

### `users`
- `id`, `name` (fullname), `username`, `password` (hashed), `role`, `email`, `status`, timestamps

### `activity_logs`
- `id`, `user_id`, `action` (exposed as `activity` in API), `description`, `ip_address`, `created_at` (timestamp)

## 7. How to verify

```bash
cd gown-galleria-api
php artisan migrate:fresh --seed
php artisan test --filter=AuthSecurityTest
```

Manual SQL injection test on login: use `' OR '1'='1` — login must fail.
