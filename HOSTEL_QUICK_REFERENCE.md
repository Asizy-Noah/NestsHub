# Hostel Module - Quick Reference Guide

## Database Collections

### Hostels Collection
```
{
  _id: ObjectId,
  managerId: ObjectId → Account
  name, email, telephone, whatsapp, address, city, country
  locationType: 'university' | 'town'
  distance: number (km)
  amenities: { security, tvRoom, readingRoom, gym, swimmingPool, parking, wifi, laundry, generator }
  services: { internet: 'free'|'paid'|'none', catering: 'included'|'additional_fee'|'none', distanceToMarket, distanceToHospital, distanceToPharmacy, distanceToClinic }
  coverImage: url, utilityImages: [urls]
  verificationStatus: 'unverified' | 'pending' | 'verified' | 'rejected'
  isActive: boolean
  createdAt, updatedAt
}
```

### Rooms Collection
```
{
  _id: ObjectId,
  hostelId: ObjectId → Hostel
  type: 'single' | 'double' | 'triple' | 'dormitory'
  roomNumber: string, floor: number
  isSelfContained: boolean
  cookingPolicy: 'electricity' | 'charcoal' | 'gas' | 'not_allowed'
  images: [urls], pricePerMonth: number, capacity: number
  isAvailable: boolean, amenities: [strings]
  createdAt, updatedAt
}
```

## API Endpoints Quick Lookup

| Method | Endpoint | Auth | Purpose |
|--------|----------|------|---------|
| POST | `/hostels` | ✓ | Create hostel |
| GET | `/hostels` | - | List all hostels (paginated) |
| GET | `/hostels/:id` | - | Get specific hostel |
| GET | `/hostels/my-hostel` | ✓ | Get manager's hostel |
| GET | `/hostels/verified` | - | List verified hostels |
| GET | `/hostels/search?q=term` | - | Search hostels |
| GET | `/hostels/stats` | ✓ | Get dashboard stats |
| PUT | `/hostels/:id` | ✓ | Update hostel |
| POST | `/hostels/:id/apply-verification` | ✓ | Apply for verification |
| POST | `/hostels/:hostelId/rooms` | ✓ | Create room |
| GET | `/hostels/:hostelId/rooms` | - | List rooms |
| GET | `/hostels/:hostelId/rooms/:roomId` | - | Get specific room |
| PUT | `/hostels/:hostelId/rooms/:roomId` | ✓ | Update room |
| DELETE | `/hostels/:hostelId/rooms/:roomId` | ✓ | Delete room |

## Frontend Navigation

```
/dashboard/hostel
├── Tab: Profile (hostel-profile-form.ejs)
│   ├── Progress Tracker (3 steps)
│   ├── Basic Information Form
│   ├── Location Form
│   ├── Amenities Toggle Grid
│   ├── Services Selection
│   ├── Media Upload
│   └── Verification Section
├── Tab: Rooms (room-management.ejs)
│   ├── Room Gallery Grid
│   ├── Add Room Button
│   └── Add/Edit Room Modal
└── Tab: Settings (hostel-settings.ejs)
    ├── Hostel Active/Inactive Toggle
    ├── Manager Profile Edit
    ├── Password Change with Strength
    ├── Two-Factor Authentication
    └── Data & Privacy Options
```

## Alpine.js Components Map

| Component | Location | Purpose |
|-----------|----------|---------|
| `hostelDashboard()` | dashboard.ejs | Main dashboard state |
| `hostelProfileForm()` | hostel-profile-form.ejs | Profile form handling |
| `roomManagement()` | room-management.ejs | Room CRUD operations |
| `hostelSettings()` | hostel-settings.ejs | Settings management |
| `toastManager()` | toast-notification.ejs | Notification system |

## Color Theme Reference

```css
/* Primary Colors */
--indigo-600: #4f46e5    /* Main actions, highlights */
--slate-50: #f8fafc      /* Light backgrounds */
--slate-900: #0f172a     /* Dark backgrounds */

/* Semantic Colors */
--emerald-500: #10b981   /* Success, Verified */
--amber-500: #f59e0b     /* Warning, Pending */
--red-500: #ef4444       /* Danger, Delete */
--blue-500: #3b82f6      /* Info, Secondary */
```

## Common Tasks

### Create Hostel in Frontend
```javascript
const response = await fetch('/hostels', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + localStorage.getItem('token')
  },
  body: JSON.stringify({
    name: 'Hostel Name',
    email: 'hostel@email.com',
    locationType: 'university',
    distance: 2.5,
    // ... other fields
  })
});
```

### Show Toast Notification
```javascript
showToast('Operation successful!', 'success');
// Types: 'success', 'error', 'warning', 'info'
```

### Get Hostel Stats
```javascript
const response = await fetch('/hostels/stats', {
  headers: { 'Authorization': 'Bearer ' + token }
});
const stats = await response.json();
// Returns: { hostelId, name, verificationStatus, totalRooms, availableRooms, occupiedRooms, amenitiesCount }
```

### Add Room
```javascript
const response = await fetch(`/hostels/${hostelId}/rooms`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + token
  },
  body: JSON.stringify({
    roomNumber: '101',
    type: 'single',
    floor: 1,
    capacity: 1,
    pricePerMonth: 150,
    cookingPolicy: 'not_allowed',
    isSelfContained: true
  })
});
```

## Verification Status Flow

```
Unverified → (Apply) → Pending → (Admin Review) → Verified
                                            └─→ Rejected
```

## Amenities Icons

| Amenity | Icon | Type |
|---------|------|------|
| Security | fa-shield-alt | Toggle |
| TV Room | fa-tv | Toggle |
| Reading Room | fa-book | Toggle |
| Gym | fa-dumbbell | Toggle |
| Swimming Pool | fa-water | Toggle |
| Parking | fa-parking | Toggle |
| WiFi | fa-wifi | Toggle |
| Laundry | fa-socks | Toggle |
| Generator | fa-bolt | Toggle |

## Room Types & Properties

| Type | Beds | Icon |
|------|------|------|
| Single | 1 | fa-bed |
| Double | 2 | fa-bed |
| Triple | 3 | fa-bed |
| Dormitory | 4+ | fa-bed |

## Cooking Policies

| Policy | Description |
|--------|-------------|
| Electricity | Electric cookers/stoves allowed |
| Charcoal | Charcoal stoves allowed |
| Gas | Gas cooking allowed |
| Not Allowed | No cooking permitted |

## Service Types

### Internet Options
- `free`: Included in room
- `paid`: Additional fee required
- `none`: Not available

### Catering Options
- `included`: Meals included in room price
- `additional_fee`: Available for extra charge
- `none`: Not provided

## Useful Utility Functions

```javascript
// Format verification status
hostelUtils.formatVerificationStatus('verified')
// → { text: 'Verified', color: 'text-emerald-600', ... }

// Get amenity icon
hostelUtils.getAmenityIcon('security')
// → 'fa-shield-alt'

// Format room type
hostelUtils.formatRoomType('single')
// → 'Single'

// Calculate occupancy
hostelUtils.calculateOccupancy(10, 3)  // Total rooms, Available rooms
// → 70 (%)
```

## Performance Considerations

1. **Indexes**: Hostels collection indexed on managerId, email, city, verificationStatus, createdAt
2. **Pagination**: Always use skip/limit parameters for list endpoints
3. **Search**: Uses MongoDB regex with case-insensitive matching
4. **Images**: Consider CDN storage for cover and utility images
5. **Caching**: Future optimization point for verified hostels list

## Error Handling

```javascript
try {
  const response = await fetch(url, options);
  if (!response.ok) {
    showToast('Error: ' + response.statusText, 'error');
    return;
  }
  const data = await response.json();
  showToast('Success!', 'success');
} catch (error) {
  showToast('Error: ' + error.message, 'error');
}
```

## Security Checklist

- ✓ JWT authentication required for sensitive endpoints
- ✓ Manager can only modify own hostel
- ✓ Authorization checks on room operations
- ✓ Input validation on all DTOs
- ✓ Email uniqueness enforced
- ✓ Password hashing on account changes
- ✓ CORS configured (if applicable)

## Related Modules

- **Auth Module**: Handles JWT tokens and authentication
- **Accounts Module**: Manages user accounts and profiles
- **Email Service**: Sends verification status notifications (future)

## Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| Form not submitting | Check Authorization header and JWT token |
| Images not uploading | Implement cloud storage integration |
| Rooms not sorting | Use floor and roomNumber in query |
| Dark mode not persisting | Check localStorage 'darkMode' key |
| Notifications not showing | Ensure toast container exists in DOM |
