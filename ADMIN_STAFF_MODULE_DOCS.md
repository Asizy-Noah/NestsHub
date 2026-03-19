# Admin & Staff Module Documentation

## Overview

The Admin & Staff Module provides comprehensive management capabilities for administering the Real Estate platform. It includes role-based access control, account management, property verification, and blog management.

## Architecture

### Backend Components

#### 1. Role-Based Access Control

**Files:**
- `src/auth/guards/roles.guard.ts` - Guards route access based on user roles
- `src/auth/decorators/roles.decorator.ts` - Decorator to specify allowed roles for routes

**Usage:**
```typescript
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('admin', 'staff')
async manageBlog(@Request() req) {
  // Only admin and staff can access
}
```

#### 2. Account Schema Updates

**New Roles Added:**
- `ADMIN` - Full platform access and management
- `STAFF` - Limited access, read-only for properties, full CRUD for blogs

**Account Fields:**
All existing fields plus the ability to assign ADMIN and STAFF roles.

#### 3. Blog Module (Complete)

**Schema (`src/blogs/schemas/blog.schema.ts`):**
- `title` - Blog post title (required, unique slug generated)
- `content` - Blog post HTML/text content (required)
- `coverImage` - Optional cover image URL
- `authorId` - Reference to Account (required)
- `authorName` - Author name for display
- `status` - 'draft' or 'published'
- `views` - View count (auto-incremented)
- `tags` - Array of blog tags
- `createdAt`, `updatedAt`, `publishedAt` - Timestamps

**Service (`src/blogs/blogs.service.ts`):**
- `create(dto, authorId, authorName)` - Create new blog
- `findAll(page, limit, status)` - Get paginated blogs
- `findByAuthor(authorId, page, limit)` - Get author's blogs
- `findOne(slug)` - Get single blog and increment views
- `findById(id)` - Get blog by ID
- `update(id, dto, authorId)` - Update blog (authorization check)
- `delete(id, authorId)` - Delete blog (authorization check)
- `search(query, page, limit)` - Search blogs by title/content/tags

**Controller (`src/blogs/blogs.controller.ts`):**
- `GET /blogs/index` - Render blogs listing (EJS)
- `GET /blogs/create` - Render create blog form (requires JWT)
- `GET /blogs/edit/:id` - Render edit blog form (requires JWT)
- `GET /blogs/:slug` - Display single blog
- `POST /blogs` - Create blog (admin/staff only)
- `GET /blogs` - List all published blogs
- `GET /blogs/author/:authorId` - List author's blogs
- `PUT /blogs/:id` - Update blog (admin/staff only)
- `DELETE /blogs/:id` - Delete blog (admin/staff only)
- `GET /blogs/search` - Search blogs

### Frontend Components

#### 1. Admin Dashboard

**Location:** `views/dashboard/admin/index.ejs`

**Features:**
- Statistics cards (Total Accounts, Active Properties, Pending Verification, Staff Members)
- Quick action buttons (Add Staff, View Hostels, View Hotels, Manage Blogs)
- Recent activity feed
- Dark mode toggle
- Responsive grid layout

**Sidebar Navigation:**
- Dashboard
- Hostels (verify/unverify)
- Hotels (verify/unverify)
- Rentals (verify/unverify)
- Property Owners (activate/deactivate)
- Brokers (activate/deactivate)
- Hostel Managers (activate/deactivate)
- Hotel Managers (activate/deactivate)
- Staff (create/edit/delete)
- Blogs (manage)
- Logout

#### 2. Staff Dashboard

**Location:** `views/dashboard/staff/index.ejs`

**Features:**
- Statistics cards (Hostels, Hotels, Rentals, My Blogs)
- Quick action buttons (New Blog, View Properties)
- Information banner about staff responsibilities
- Recent blogs section with edit/delete
- Blog creation shortcut
- Dark mode toggle

**Sidebar Navigation:**
- Dashboard
- Hostels (read-only)
- Hotels (read-only)
- Rentals (read-only)
- Property Owners (read-only)
- Brokers (read-only)
- Blogs (full CRUD)
- Logout

#### 3. Blog Templates

**Create Blog (`views/blogs/create.ejs`):**
- Title input
- Cover image upload with preview
- Rich content textarea with character counter
- Tags input (comma-separated)
- Status toggle (draft/published)
- Submit and cancel buttons
- Error messaging
- Alpine.js form management

**Index Blog (`views/blogs/index.ejs`):**
- Blog grid layout (1-3 columns responsive)
- Blog cards with cover image, title, author, date
- Tags display
- View count
- Read more links
- Search functionality
- Pagination
- Empty state

#### 4. Sidebar Partials

**Admin Sidebar (`views/partials/admin-sidebar.ejs`):**
- Indigo-500 active states
- Emerald-600 for activation actions
- Rose-600 for deactivation
- User info display
- Logout button

**Staff Sidebar (`views/partials/staff-sidebar.ejs`):**
- Light Blue-600 branding
- Distinguishes staff from admin
- Read-only property links
- Full blog management access
- User info display

## Authentication Flow

### Login Redirect Logic

When a user logs in, the `POST /auth/login` endpoint returns a `redirect` property based on role:

```json
{
  "user": { "id": "...", "email": "...", "role": "admin" },
  "token": "jwt_token",
  "redirect": "/dashboard/admin"
}
```

**Role Redirect Map:**
- `admin` → `/dashboard/admin`
- `staff` → `/dashboard/staff`
- `hostel_owner` → `/dashboard/hostel`
- `hotel_owner` → `/dashboard/hotel`
- `property_manager` → `/dashboard/properties`
- `individual` → `/dashboard`

### Frontend Implementation

Login form captures the response and redirects:
```javascript
const response = await fetch('/auth/login', { method: 'POST', body: loginData });
const data = await response.json();
if (data.redirect) {
  window.location.href = data.redirect;
}
```

## Database Schema Updates

### New Collections

**Blogs Collection:**
```
{
  _id: ObjectId,
  slug: String (unique),
  title: String,
  content: String,
  coverImage: String,
  authorId: ObjectId (ref: Account),
  authorName: String,
  status: String ('draft' | 'published'),
  views: Number,
  tags: [String],
  createdAt: Date,
  updatedAt: Date,
  publishedAt: Date
}
```

**Indexes:**
- `{ slug: 1 }`
- `{ authorId: 1 }`
- `{ status: 1 }`
- `{ createdAt: -1 }`
- `{ tags: 1 }`

### Account Schema Changes

**New Enum Values:**
```typescript
export enum AccountRole {
  INDIVIDUAL = 'individual',
  HOSTEL_OWNER = 'hostel_owner',
  HOTEL_OWNER = 'hotel_owner',
  PROPERTY_MANAGER = 'property_manager',
  ADMIN = 'admin',        // NEW
  STAFF = 'staff',        // NEW
}
```

## API Endpoints

### Blog Endpoints

| Method | Endpoint | Auth | Roles | Purpose |
|--------|----------|------|-------|---------|
| POST | `/blogs` | JWT | admin, staff | Create blog |
| GET | `/blogs` | None | - | List all published blogs |
| GET | `/blogs/:slug` | None | - | Get single blog |
| GET | `/blogs/author/:authorId` | None | - | List author's blogs |
| PUT | `/blogs/:id` | JWT | admin, staff | Update blog |
| DELETE | `/blogs/:id` | JWT | admin, staff | Delete blog |
| GET | `/blogs/search` | None | - | Search blogs |

### Admin-Only Endpoints (To Be Implemented)

| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | `/accounts/staff` | Create staff account |
| GET | `/accounts/staff` | List all staff |
| PUT | `/accounts/:id/activate` | Activate account |
| PUT | `/accounts/:id/deactivate` | Deactivate account |
| PUT | `/hostels/:id/verify` | Verify hostel |
| PUT | `/hotels/:id/verify` | Verify hotel |
| PUT | `/rentals/:id/verify` | Verify rental |

## UI/UX Guidelines

### Color Scheme

- **Admin Panel:** Indigo-600 (primary), Emerald-600 (verify), Rose-600 (unverify)
- **Staff Panel:** Light Blue-600 (primary)
- **Dark Mode:** Full support throughout
- **Sidebar:** Slate-900 background with role-specific accent color

### Components

- Responsive tables with horizontal scroll on mobile
- Status badges with color coding
- Toggle switches for on/off actions
- Confirm dialogs for destructive actions
- Toast notifications for feedback
- Loading spinners on form submission

### Tables Structure

```html
<table class="w-full">
  <thead class="bg-slate-100 dark:bg-slate-700">
    <tr>
      <th class="px-6 py-3 text-left">Column</th>
      <!-- More columns -->
      <th class="px-6 py-3 text-right">Actions</th>
    </tr>
  </thead>
  <tbody class="divide-y">
    <tr class="hover:bg-slate-50 dark:hover:bg-slate-700">
      <td class="px-6 py-4">Data</td>
      <!-- More cells -->
    </tr>
  </tbody>
</table>
```

## Authorization & Permissions

### Admin Permissions
- View all accounts and properties
- Activate/deactivate accounts
- Verify/unverify properties
- Create, edit, delete staff accounts
- Manage all blogs
- View analytics and reports

### Staff Permissions
- View all accounts and properties (read-only)
- Cannot modify or delete accounts/properties
- Full CRUD for blogs (create, edit, delete own blogs)
- Cannot access admin controls

### Enforcement

All protected routes use:
```typescript
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('admin')
```

Authorization is also checked at the service level for data ownership.

## Utilities & Helpers

### Admin Utilities (`adminUtils` in public/js/utils.js)

```javascript
adminUtils.formatRole(role)           // "admin" → "Admin"
adminUtils.getRoleColor(role)         // Get badge color for role
adminUtils.getStatusColor(status)     // Get badge color for status
adminUtils.getVerificationColor(status) // Get badge color for verification
adminUtils.canManageAccount(userRole, targetRole) // Check permission
```

## Error Handling

### Common Errors

1. **Unauthorized Access**
   - Status: 403
   - Message: "Insufficient permissions"

2. **Blog Not Found**
   - Status: 404
   - Message: "Blog not found"

3. **Authorization Failed**
   - Status: 400
   - Message: "You can only edit your own blogs"

4. **Duplicate Slug**
   - Status: 400
   - Message: "Blog slug already exists"

## Next Steps for Completion

The following views still need implementation:

1. **Admin Management Views:**
   - `/dashboard/admin/hostels` - List and verify hostels
   - `/dashboard/admin/hotels` - List and verify hotels
   - `/dashboard/admin/rentals` - List and verify rentals
   - `/dashboard/admin/property-owners` - Manage property owners
   - `/dashboard/admin/brokers` - Manage brokers
   - `/dashboard/admin/hostel-managers` - Manage hostel managers
   - `/dashboard/admin/hotel-managers` - Manage hotel managers
   - `/dashboard/admin/staff` - Create/edit/delete staff
   - `/dashboard/admin/blogs` - Blog moderation

2. **Staff Read-Only Views:**
   - `/dashboard/staff/hostels` - View hostels (no edit/delete)
   - `/dashboard/staff/hotels` - View hotels (no edit/delete)
   - `/dashboard/staff/rentals` - View rentals (no edit/delete)
   - `/dashboard/staff/property-owners` - View owners (no edit/delete)
   - `/dashboard/staff/brokers` - View brokers (no edit/delete)

3. **Blog Management:**
   - Blog edit template (`views/blogs/edit.ejs`)
   - Blog detail view (`views/blogs/show.ejs`)
   - Admin blog moderation interface

All core functionality is in place; templates need to be created following the established patterns.
