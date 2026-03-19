# Hotel Module - Complete Documentation

## Overview

The Hotel Module provides comprehensive hotel management functionality for the Real Estate/Housing platform. It includes complete CRUD operations for hotels and rooms, inventory management, verification workflows, and a responsive dashboard with room management capabilities.

## Database Architecture

### Hotel Schema

Located: `src/hotels/schemas/hotel.schema.ts`

**Fields:**
- `managerId`: Reference to Account (Hotel Manager)
- `name`: Hotel name (unique)
- `description`: Hotel description
- `contactDetails`:
  - `telephone`: Hotel contact number
  - `email`: Hotel email (unique)
  - `whatsapp`: WhatsApp number
- `location`:
  - `district`: District name
  - `townOrCity`: Town/City name
  - `street`: Street address
  - `distanceToMainRoad`: Enum (on_the_road, less_500m, 500m_1km, 1km_5km, 5km_plus)
- `media`:
  - `coverPhoto`: Primary image URL
  - `gallery`: Array of image URLs
- `amenities` (Document):
  - `gym`: Boolean
  - `bar`: Boolean
  - `restaurant`: Boolean
  - `parkingSpace`: Boolean
  - `storageBuilding`: Boolean
  - `supermarketNearby`: Boolean
- `connectivity`:
  - `wifiStatus`: Enum (free, extra_charge, none)
- `paymentMethods`: Array of enums (cash, mobile_money, visa)
- `verificationStatus`: Enum (unverified, pending, verified, rejected)
- `verificationAppliedAt`: Timestamp
- `verificationApprovedAt`: Timestamp
- `verificationRejectionReason`: String
- `isActive`: Boolean (default: true)
- `timestamps`: createdAt, updatedAt

### Hotel Room Schema

Located: `src/hotels/schemas/hotel-room.schema.ts`

**Fields:**
- `hotelId`: Reference to Hotel
- `photo`: Room image URL
- `roomType`: Enum (single, double, suite)
- `isSelfContained`: Boolean
- `floor`: Number (0-10)
- `amenities` (Document):
  - `hasBalcony`: Boolean
  - `hasHotWater`: Boolean
  - `hasTV`: Boolean
  - `hasDSTV`: Boolean
  - `hasTableChair`: Boolean
- `bedSize`: Enum (3x6, 4x6, 6x6)
- `pricing`:
  - `costPerNight`: Number
  - `breakfastIncluded`: Boolean
- `inventory`:
  - `totalRooms`: Number
  - `bookedRooms`: Number
  - `availableRooms`: Virtual/Computed field
- `isActive`: Boolean (default: true)
- `timestamps`: createdAt, updatedAt

## Backend API

### Hotel Endpoints

#### Create Hotel
```
POST /api/hotels
Auth: Required (JWT)

Body:
{
  "name": "Hotel Name",
  "email": "hotel@example.com",
  "telephone": "+256...",
  "whatsapp": "+256...",
  "district": "Kampala",
  "townOrCity": "Kampala City",
  "street": "Plot 45, Acacia Avenue",
  "distanceToMainRoad": "1km_5km",
  "description": "...",
  "amenities": {
    "gym": true,
    "bar": false,
    "restaurant": true
  },
  "wifiStatus": "free",
  "paymentMethods": ["cash", "mobile_money"]
}

Response: Hotel object
```

#### Get My Hotel
```
GET /api/hotels/my-hotel
Auth: Required (JWT)

Response: Hotel object
```

#### Get Hotel By ID
```
GET /api/hotels/:id

Response: Hotel object
```

#### Update Hotel
```
PUT /api/hotels/:id
Auth: Required (JWT)

Body: Same as Create Hotel

Response: Updated Hotel object
```

#### Update Hotel Amenities
```
PUT /api/hotels/:id/amenities
Auth: Required (JWT)

Body:
{
  "gym": true,
  "bar": true,
  "restaurant": false
}

Response: Updated Hotel object
```

#### Apply for Verification
```
POST /api/hotels/:id/apply-verification
Auth: Required (JWT)

Response: Hotel object with verificationStatus: "pending"
```

#### Toggle Hotel Active Status
```
PUT /api/hotels/:id/toggle-active
Auth: Required (JWT)

Body:
{
  "isActive": true
}

Response: Updated Hotel object
```

#### Search Hotels
```
GET /api/hotels?q=query&district=Kampala&town=City&verified=true

Query Parameters:
- q: Search query (name, description)
- district: Filter by district
- town: Filter by town/city
- verified: Filter by verification (true/false)

Response: Array of Hotel objects
```

#### Get Verified Hotels
```
GET /api/hotels/verified/list

Response: Array of verified Hotel objects
```

#### Get Dashboard Stats
```
GET /api/hotels/dashboard/stats
Auth: Required (JWT)

Response:
{
  "hotel": {
    "name": "Hotel Name",
    "isVerified": true,
    "verificationStatus": "verified"
  },
  "inventory": {
    "totalRooms": 48,
    "bookedRooms": 16,
    "availableRooms": 32,
    "occupancyRate": 33
  },
  "roomsByType": [...]
}
```

### Room Endpoints

#### Create Room
```
POST /api/hotels/:hotelId/rooms
Auth: Required (JWT)

Body:
{
  "roomType": "double",
  "bedSize": "4x6",
  "floor": 1,
  "costPerNight": 120000,
  "breakfastIncluded": true,
  "totalRooms": 5,
  "bookedRooms": 2,
  "amenities": {
    "hasBalcony": true,
    "hasHotWater": true
  }
}

Response: HotelRoom object
```

#### Get Rooms by Hotel
```
GET /api/hotels/:hotelId/rooms

Response: Array of HotelRoom objects
```

#### Get Room By ID
```
GET /api/hotels/rooms/:roomId

Response: HotelRoom object
```

#### Update Room
```
PUT /api/hotels/:hotelId/rooms/:roomId
Auth: Required (JWT)

Body: Same as Create Room

Response: Updated HotelRoom object
```

#### Update Room Inventory
```
PUT /api/hotels/:hotelId/rooms/:roomId/inventory
Auth: Required (JWT)

Body:
{
  "bookedRooms": 5
}

Response: Updated HotelRoom object
```

#### Delete Room
```
DELETE /api/hotels/:hotelId/rooms/:roomId
Auth: Required (JWT)

Response: 200 OK
```

#### Toggle Room Active Status
```
PUT /api/hotels/:hotelId/rooms/:roomId/toggle-active
Auth: Required (JWT)

Body:
{
  "isActive": true
}

Response: Updated HotelRoom object
```

## Frontend Templates

### Dashboard (`views/hotels/dashboard.ejs`)

Main dashboard template with 4 tabs:

1. **Overview Tab**
   - Total rooms count
   - Available rooms count
   - Booked rooms count
   - Occupancy rate percentage
   - Verification status card with "Apply Now" button

2. **Hotel Profile Tab**
   - 4-step progress tracker
   - Basic information form (name, email, phone)
   - Location details (district, town, street, distance)
   - Amenities grid with toggles
   - Services configuration (WiFi, payment methods)

3. **Room Management Tab**
   - Room gallery grid
   - Add/Edit room modal
   - Room details (type, bed size, floor, pricing)
   - Inventory management with visual indicators
   - Delete with confirmation

4. **Settings Tab**
   - Hotel active/inactive toggle
   - Manager profile editor
   - Password change with strength meter
   - Two-factor authentication toggle
   - Account deletion with confirmation

### Partials

#### Hotel Profile Form (`views/hotels/partials/hotel-profile-form.ejs`)
- 4-step form with progress tracker
- Radio buttons for distance selection
- Checkbox grid for amenities
- Photo upload area
- Form validation and submission handling

#### Room Management (`views/hotels/partials/room-management.ejs`)
- Room grid display with availability indicators
- Add/Edit room modal with:
  - Radio tiles for room type selection
  - Radio tiles for bed size
  - Floor level stepper
  - Pricing and inventory inputs
  - Amenity checkboxes
- Room cards showing:
  - Room image with availability badge
  - Room type and floor
  - Pricing and breakfast info
  - Inventory summary
  - Amenity icons
  - Edit/Delete buttons

#### Hotel Settings (`views/hotels/partials/hotel-settings.ejs`)
- Hotel status toggle
- Manager profile inline editing
- Password change with strength indicator
- Two-factor authentication setup
- Account deletion with confirmation

## Frontend Interactivity (Alpine.js)

### hotelProfileForm()
Manages 4-step hotel profile form:
- `currentStep`: Current form step (0-3)
- `nextStep()`: Move to next step
- `previousStep()`: Move to previous step
- `togglePaymentMethod()`: Add/remove payment methods
- `submitForm()`: Save hotel profile

### roomManagement()
Manages room list and modal:
- `rooms`: Array of room objects
- `showAddRoomModal`: Modal visibility state
- `editingIndex`: Index of room being edited
- `newRoom`: Room form data
- `saveRoom()`: Create or update room
- `deleteRoom()`: Delete room with confirmation
- `editRoom()`: Load room for editing
- `getAmenityList()`: Extract amenities from room
- `getAmenityIcon()`: Get icon for amenity

### hotelSettings()
Manages settings panel:
- `isHotelActive`: Hotel active status
- `managerProfile`: Manager details
- `passwordForm`: Password change data
- `passwordStrength`: Password strength level
- `twoFAEnabled`: 2FA toggle state
- `updatePasswordStrength()`: Calculate password strength
- `changePassword()`: Update password
- `toggleTwoFA()`: Enable/disable 2FA
- `deleteAccount()`: Permanent account deletion

## Utilities (public/js/utils.js)

Hotel-specific utility functions and data:

```javascript
hotelUtils = {
  roomTypes: ['single', 'double', 'suite'],
  bedSizes: ['3x6', '4x6', '6x6'],
  distanceOptions: [...],
  wifiOptions: [...],
  paymentMethods: [...],
  amenitiesIcons: {...},
  
  getAmenityIcon(amenity) // Get Font Awesome icon for amenity
  formatRoomType(type) // Capitalize room type
  calculateOccupancy(total, booked) // Return occupancy %
  getAvailableRooms(total, booked) // Calculate available rooms
  formatCurrency(amount) // Format as UGX currency
  formatVerificationStatus(status) // Return status object with styling
}
```

## Color Scheme

- **Primary**: Indigo-600 (Actions, buttons, active states)
- **Secondary**: Slate-900/White (Text, backgrounds)
- **Success**: Emerald-500/600 (Available rooms, verified)
- **Danger**: Red-500/600 (Booked rooms, delete actions)
- **Warning**: Amber-500 (Pending status)
- **Verification**: Blue-500 (Verified badge)

## Dark Mode Support

All templates include full dark mode support with:
- Dark backgrounds (`dark:bg-slate-800`)
- Dark text colors (`dark:text-white`)
- Dark border colors (`dark:border-slate-700`)
- Dark mode utilities from Tailwind CSS

## Authorization & Security

- Hotel managers can only access/modify their own hotel
- JWT authentication required for state-changing operations
- Ownership verification on all CRUD operations
- Input validation on all DTOs
- Email uniqueness enforcement
- Booked rooms cannot exceed total rooms validation

## Common Use Cases

### Manager Adds Hotel
1. POST `/api/hotels` with hotel details
2. System creates hotel with `verificationStatus: "unverified"`
3. Manager redirected to `/dashboard/hotel`

### Manager Applies for Verification
1. POST `/api/hotels/:id/apply-verification`
2. Status changes to `"pending"`
3. Admin reviews and approves/rejects

### Manager Adds Rooms
1. POST `/api/hotels/:hotelId/rooms` for each room
2. Rooms appear in dashboard grid
3. Inventory updated via PUT `inventory` endpoint

### Search Hotels
1. GET `/api/hotels?q=name&district=Kampala&verified=true`
2. Returns matching verified hotels
3. Used in public hotel listing pages

## Error Handling

All endpoints return standard HTTP status codes:
- `200 OK`: Successful request
- `201 Created`: Resource created
- `400 Bad Request`: Invalid input (e.g., booked > total)
- `401 Unauthorized`: Missing/invalid JWT
- `403 Forbidden`: Unauthorized access (not owner)
- `404 Not Found`: Resource doesn't exist
- `500 Internal Server Error`: Server error

## Testing

Key endpoints to test:
1. Create hotel (with required fields)
2. Add multiple rooms
3. Update inventory
4. Apply for verification
5. Toggle hotel active status
6. Search with filters
7. Verify authorization checks

## Future Enhancements

- Booking integration
- Image uploads (Vercel Blob/AWS S3)
- Admin verification workflow
- Guest reviews and ratings
- Advanced analytics dashboard
- Email notifications
- Payment integration
- Multi-language support
