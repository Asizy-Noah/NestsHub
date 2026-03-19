# Hostel Module Documentation

## Overview

The Hostel Module is a comprehensive backend and frontend system for managing hostel properties, amenities, rooms, and verification. It provides hostel managers with a complete dashboard to maintain their properties and allows the platform to display verified hostels to users.

## Database Architecture

### Hostel Schema

The Hostel schema stores all information about a hostel property:

```typescript
{
  managerId: ObjectId,           // Reference to Account owner
  name: string,                  // Hostel name
  description: string,           // Detailed description
  telephone: string,             // Phone number
  email: string,                 // Hostel email (unique)
  whatsapp: string,             // WhatsApp number
  address: string,              // Street address
  city: string,                 // City name
  country: string,              // Country name
  locationType: enum,           // 'university' | 'town'
  distance: number,             // Distance from center (km)
  
  // Amenities Object
  amenities: {
    security: boolean,
    tvRoom: boolean,
    readingRoom: boolean,
    gym: boolean,
    swimmingPool: boolean,
    parking: boolean,
    wifi: boolean,
    laundry: boolean,
    generator: boolean,
  },

  // Services Object
  services: {
    internet: enum,             // 'free' | 'paid' | 'none'
    catering: enum,            // 'included' | 'additional_fee' | 'none'
    distanceToMarket: number,
    distanceToHospital: number,
    distanceToPharmacy: number,
    distanceToClinic: number,
  },

  // Media
  coverImage: string,           // URL to cover image
  utilityImages: [string],      // Array of utility image URLs

  // Verification
  verificationStatus: enum,     // 'unverified' | 'pending' | 'verified' | 'rejected'
  verificationAppliedAt: Date,
  verificationApprovedAt: Date,
  verificationRejectionReason: string,

  isActive: boolean,            // Whether hostel appears in search
  createdAt: Date,
  updatedAt: Date,
}
```

### Room Schema

The Room schema stores individual room information within a hostel:

```typescript
{
  hostelId: ObjectId,           // Reference to Hostel
  type: enum,                   // 'single' | 'double' | 'triple' | 'dormitory'
  roomNumber: string,           // Room number/identifier
  floor: number,                // Floor level
  isSelfContained: boolean,     // Has private bathroom
  cookingPolicy: enum,          // 'electricity' | 'charcoal' | 'gas' | 'not_allowed'
  images: [string],             // Array of room image URLs
  pricePerMonth: number,        // Monthly price
  capacity: number,             // Number of beds
  isAvailable: boolean,         // Currently available
  description: string,          // Room description
  amenities: [string],          // Array of amenities (fan, desk, window, etc.)
  createdAt: Date,
  updatedAt: Date,
}
```

## API Endpoints

### Hostel Management

#### Create Hostel
- **Route**: `POST /hostels`
- **Auth**: Required (JWT)
- **Body**: CreateHostelDto
- **Returns**: Created Hostel object

#### Get My Hostel
- **Route**: `GET /hostels/my-hostel`
- **Auth**: Required (JWT)
- **Returns**: Manager's hostel object

#### Get Hostel by ID
- **Route**: `GET /hostels/:id`
- **Returns**: Hostel object with all details

#### Update Hostel
- **Route**: `PUT /hostels/:id`
- **Auth**: Required (JWT)
- **Body**: UpdateHostelDto
- **Returns**: Updated hostel object

#### Apply for Verification
- **Route**: `POST /hostels/:id/apply-verification`
- **Auth**: Required (JWT)
- **Body**: ApplyVerificationDto (optional additionalInfo)
- **Returns**: Updated hostel with status = 'pending'

#### Get All Hostels
- **Route**: `GET /hostels`
- **Query**: `skip=0&limit=10`
- **Returns**: Paginated list of all hostels

#### Get Verified Hostels
- **Route**: `GET /hostels/verified`
- **Query**: `skip=0&limit=10`
- **Returns**: Paginated list of verified hostels only

#### Search Hostels
- **Route**: `GET /hostels/search`
- **Query**: `q=search_term&skip=0&limit=10`
- **Returns**: Search results matching name, city, address, or description

#### Get Hostel Stats
- **Route**: `GET /hostels/stats`
- **Auth**: Required (JWT)
- **Returns**: Dashboard statistics for manager's hostel

### Room Management

#### Create Room
- **Route**: `POST /hostels/:hostelId/rooms`
- **Auth**: Required (JWT)
- **Body**: CreateRoomDto
- **Returns**: Created Room object

#### Get Rooms by Hostel
- **Route**: `GET /hostels/:hostelId/rooms`
- **Returns**: Array of rooms sorted by floor and number

#### Get Room by ID
- **Route**: `GET /hostels/:hostelId/rooms/:roomId`
- **Returns**: Room object

#### Update Room
- **Route**: `PUT /hostels/:hostelId/rooms/:roomId`
- **Auth**: Required (JWT)
- **Body**: UpdateRoomDto
- **Returns**: Updated Room object

#### Delete Room
- **Route**: `DELETE /hostels/:hostelId/rooms/:roomId`
- **Auth**: Required (JWT)
- **Returns**: Success message

## Frontend Templates

### Dashboard (`/views/hostels/dashboard.ejs`)

The main dashboard provides:
- Quick statistics (verification status, room counts, amenities)
- Tab navigation (Profile, Rooms, Settings)
- Dark mode toggle
- Responsive design

### Profile Management (`/views/hostels/partials/hostel-profile-form.ejs`)

Features:
- **Progress Tracker**: Visual indicator of setup completion
- **Basic Information**: Name, email, phone, WhatsApp, description
- **Location**: Address, city, country, location type, distance
- **Amenities**: Toggle switches for security, gym, pool, parking, etc.
- **Services**: Radio selections for internet, catering, and proximity distances
- **Media Upload**: Cover image and utility images with preview
- **Verification Application**: One-click verification request

### Room Management (`/views/hostels/partials/room-management.ejs`)

Features:
- **Room Gallery**: Grid view of all rooms with quick actions
- **Add/Edit Modal**: 
  - Room number and floor with step controls
  - Room type selection (Single/Double/Triple/Dormitory)
  - Capacity and monthly price inputs
  - Cooking policy selection
  - Self-contained toggle
  - Image upload (if implemented)

### Settings (`/views/hostels/partials/hostel-settings.ejs`)

Features:
- **Hostel Management**: Activate/deactivate hostel
- **Manager Profile**: Edit first name, last name, email, phone
- **Security Settings**: 
  - Password change with strength indicator
  - Real-time validation feedback
  - Password confirmation
- **Two-Factor Authentication**: Toggle 2FA on/off
- **Data & Privacy**: Download data and delete account options

## Alpine.js Components

### Toast Notifications
Global notification system for success, error, warning, and info messages.

```javascript
showToast('Message here', 'success'); // Types: success, error, warning, info
```

### Hostel Dashboard State
```javascript
hostelDashboard() {
  return {
    activeTab,           // Current tab: profile, rooms, settings
    isDarkMode,         // Dark mode state
    verificationStatus, // Current verification status
    totalRooms,         // Total rooms count
    availableRooms,     // Available rooms count
    amenitiesCount,     // Number of enabled amenities
    toggleDarkMode(),   // Toggle dark mode
  };
}
```

### Hostel Profile Form State
```javascript
hostelProfileForm() {
  return {
    form,                        // Form data object
    coverImagePreview,          // Preview URL for cover image
    utilityImagePreviews,       // Array of utility image previews
    verificationStatus,         // Current verification status
    submitForm(e),              // Submit form handler
    previewCoverImage(e),       // Handle cover image selection
    previewUtilityImages(e),    // Handle utility images selection
    removeUtilityImage(idx),    // Remove utility image
    resetForm(),                // Reset form to initial state
    applyVerification(),        // Apply for verification
  };
}
```

### Room Management State
```javascript
roomManagement() {
  return {
    rooms,                      // Array of rooms
    showAddRoomModal,          // Modal visibility state
    editingRoomId,             // Currently editing room ID
    roomForm,                  // Room form data
    resetRoomForm(),           // Reset form
    editRoom(room),            // Load room for editing
    submitRoom(e),             // Submit room form
    deleteRoom(roomId),        // Delete room
  };
}
```

### Hostel Settings State
```javascript
hostelSettings() {
  return {
    hostelActive,              // Hostel active/inactive
    twoFactorEnabled,         // 2FA status
    managerProfile,           // Manager profile data
    passwordForm,             // Password change form
    passwordStrength,         // Password strength indicator
    passwordStrengthText,     // Password strength description
    toggleHostelStatus(),     // Toggle hostel active state
    updateManagerProfile(e),  // Update profile handler
    updatePassword(e),        // Update password handler
    toggleTwoFactor(),        // Toggle 2FA handler
    deleteAccount(),          // Delete account handler
  };
}
```

## Styling & Theme

### Color System
- **Primary**: Indigo-600 (Professional, trustworthy)
- **Success**: Emerald-500 (Verified, positive actions)
- **Warning**: Amber-500 (Pending, caution)
- **Danger**: Red-500 (Delete, critical actions)
- **Backgrounds**: Slate-50 (Light) / Slate-900 (Dark)

### Responsive Design
- Mobile-first approach
- Tailwind CSS utility classes
- Dark mode support throughout

## Security

### Authentication
- JWT tokens required for all state-changing operations
- Manager can only modify their own hostel
- Authorization checks on hostel and room ownership

### Validation
- Input validation on all DTOs
- Email uniqueness validation
- Distance inputs must be non-negative numbers
- Room numbers must be unique per hostel

## Redirect Middleware

After login, users with the `HOSTEL_OWNER` role are automatically redirected to `/dashboard/hostel` via the `HostelRedirectMiddleware`.

## File Structure

```
src/hostels/
├── schemas/
│   ├── hostel.schema.ts
│   └── room.schema.ts
├── dto/
│   ├── create-hostel.dto.ts
│   └── create-room.dto.ts
├── hostels.service.ts
├── hostels.controller.ts
└── hostels.module.ts

views/hostels/
├── dashboard.ejs
└── partials/
    ├── hostel-profile-form.ejs
    ├── room-management.ejs
    └── hostel-settings.ejs

public/js/
└── utils.js (hostel utilities)
```

## Future Enhancements

1. **Image Upload**: Integration with cloud storage (Cloudinary, AWS S3)
2. **Room Pricing**: Dynamic pricing, seasonal rates
3. **Booking Integration**: Connect with booking system
4. **Analytics**: Dashboard with occupancy charts and revenue tracking
5. **Ratings & Reviews**: Guest ratings display
6. **Multi-language**: Support for multiple languages
7. **Mobile App**: Native mobile app for hostel managers
