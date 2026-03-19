# Real Estate Platform - Quick Reference Guide

## Start Here

1. **Setup**: `pnpm install && cp .env.example .env`
2. **Configure**: Add MongoDB URI to `.env`
3. **Start**: `pnpm dev`
4. **Visit**: `http://localhost:3000`

---

## User Flows

### Registration Flow
```
Home → Register 
  ↓ (Email sent)
Verify Email 
  ↓ (Token confirmed)
Set Password 
  ↓ (Password created)
Login 
  ↓ (JWT issued)
Dashboard
```

### Hostel Manager Flow
```
Login 
  ↓ (Role: HOSTEL_OWNER)
Dashboard → Create Hostel 
  ↓ (Form submission)
Add Rooms 
  ↓ (Room creation)
Upload Photos 
  ↓ (Gallery upload)
Apply Verification 
  ↓ (Document proof)
Go Live (Verified)
```

### Hotel Manager Flow
```
Login 
  ↓ (Role: HOTEL_OWNER)
Dashboard → Create Hotel 
  ↓ (Multi-step form)
Configure Amenities 
  ↓ (Feature selection)
Add Rooms with Inventory 
  ↓ (Room management)
Track Occupancy 
  ↓ (Booked vs Available)
Apply Verification
```

### Rental Manager Flow
```
Login 
  ↓ (Role: PROPERTY_OWNER or PROPERTY_BROKER)
Dashboard → Create Property 
  ↓ (3-step wizard)
Step 1: Basics 
  ↓ (Property type & units)
Step 2: Features & Billing 
  ↓ (Toggles & charges)
Step 3: Location & Contact 
  ↓ (Address & proximity)
Apply for Verification 
  ↓ (Upload proof)
Get Listed (Verified)
```

---

## API Quick Access

### Authentication
```
POST   /api/auth/register        # Create account
POST   /api/auth/verify-email    # Confirm email
POST   /api/auth/set-password    # Set password
POST   /api/auth/login           # Login
POST   /api/auth/forgot-password # Request reset
POST   /api/auth/reset-password  # Complete reset
```

### Hostels
```
POST   /api/hostels              # Create hostel
GET    /api/hostels/my-hostel    # Get your hostel
PUT    /api/hostels/:id          # Update hostel
DELETE /api/hostels/:id          # Delete hostel
POST   /api/hostels/:id/rooms    # Add room
PUT    /api/hostels/:id/rooms/:rid # Update room
DELETE /api/hostels/:id/rooms/:rid # Delete room
```

### Hotels
```
POST   /api/hotels               # Create hotel
GET    /api/hotels/my-hotel      # Get your hotel
PUT    /api/hotels/:id           # Update hotel
POST   /api/hotels/:id/rooms     # Add room
GET    /api/hotels/:id/rooms     # List rooms
PUT    /api/hotels/:id/rooms/:rid # Update room
```

### Rentals
```
POST   /api/rentals              # Create property
GET    /api/rentals/my-properties # List your properties
PUT    /api/rentals/:id          # Update property
DELETE /api/rentals/:id          # Delete property
GET    /api/rentals/search       # Search properties
GET    /api/rentals/verified     # Get verified listings
POST   /api/rentals/:id/apply-verification # Apply
POST   /api/rentals/:id/upload-proof      # Upload proof
```

---

## Dashboard Routes

| Role | Route | Page |
|------|-------|------|
| Individual | `/accounts/dashboard` | Account overview |
| Individual | `/accounts/profile` | Profile settings |
| Hostel Owner | `/dashboard/hostel` | Hostel manager |
| Hotel Owner | `/dashboard/hotel` | Hotel manager |
| Owner/Broker | `/dashboard/properties` | Rental manager |

---

## Database Collections

### Accounts
```
{
  _id: ObjectId,
  firstName: String,
  lastName: String,
  email: String (unique),
  passwordHash: String,
  role: Enum,
  emailVerified: Boolean,
  emailToken: String,
  phone: String,
  // Role-specific fields:
  hostelName?: String,
  hotelName?: String,
  // ...timestamps
}
```

### Hostels
```
{
  _id: ObjectId,
  managerId: ObjectId (ref Account),
  name: String,
  amenities: {
    security, tvRoom, readingRoom, gym, pool, etc.
  },
  rooms: [ObjectId],
  gallery: [String],
  verificationStatus: Enum,
  isActive: Boolean
}
```

### Hotels
```
{
  _id: ObjectId,
  managerId: ObjectId (ref Account),
  name: String,
  amenities: {
    gym, bar, restaurant, parking, storage, etc.
  },
  wifiStatus: Enum,
  paymentMethods: [Enum],
  verificationStatus: Enum,
  isActive: Boolean
}
```

### Rentals
```
{
  _id: ObjectId,
  managerId: ObjectId (ref Account),
  propertyName: String,
  houseType: Enum (studio, 1-bedroom, etc.),
  unitCount: Number,
  monthlyRent: Number,
  features: {
    isSelfContained, isFenced, hasAmpleParking, etc.
  },
  isFurnished: Boolean,
  furnitureList: [String],
  waterBillPaidBy: Enum (tenant/landlord),
  electricityBillPaidBy: Enum,
  securityFeePaidBy: Enum,
  nearestCity: String,
  nearestTown: String,
  accessRoadType: Enum (tarmac/murram),
  verificationStatus: Enum,
  isActive: Boolean
}
```

---

## Form Patterns

### Toggle Switch (On/Off)
```ejs
<button
  @click="form.field = !form.field"
  :class="form.field ? 'bg-emerald-500' : 'bg-slate-300'"
  class="px-4 py-2 rounded-lg font-medium transition"
>
  <%= form.field ? 'Enabled' : 'Disabled' %>
</button>
```

### Segmented Buttons (Exclusive Select)
```ejs
<div class="flex gap-2">
  <% ['option1', 'option2'].forEach(opt => { %>
    <button
      @click="form.field = '<%= opt %>'"
      :class="form.field === '<%= opt %>' ? 'bg-teal-600 text-white' : 'bg-slate-200'"
      class="flex-1 py-2 rounded-lg transition"
    >
      <%= opt %>
    </button>
  <% }); %>
</div>
```

### Checkbox Grid (Multi-select)
```ejs
<div class="space-y-2">
  <% items.forEach(item => { %>
    <label class="flex gap-2">
      <input
        type="checkbox"
        @change="toggleItem('<%= item %>')"
        class="w-4 h-4 rounded"
      />
      <span><%= item %></span>
    </label>
  <% }); %>
</div>
```

### Conditional Display (Alpine.js)
```ejs
<template x-if="form.isFurnished">
  <!-- Furniture list appears only when furnished -->
  <div>Furniture selection...</div>
</template>
```

---

## Styling Quick Reference

### Button Styles
```
Primary:    bg-teal-600 hover:bg-teal-700
Secondary:  bg-slate-100 dark:bg-slate-700
Danger:     bg-red-600 hover:bg-red-700
Success:    bg-emerald-600 hover:bg-emerald-700
```

### Text Colors
```
Heading:    text-slate-900 dark:text-white
Body:       text-slate-700 dark:text-slate-300
Muted:      text-slate-600 dark:text-slate-400
```

### Status Badges
```
Verified:   bg-emerald-100 text-emerald-800
Pending:    bg-amber-100 text-amber-800
Unverified: bg-slate-100 text-slate-800
```

---

## Common Tasks

### Create a Hostel
```
1. Navigate to /dashboard/hostel
2. Click "Create Hostel"
3. Fill in basic info (name, location, district)
4. Click "Add Amenities"
5. Toggle amenities you have
6. Click "Add Photo" for gallery
7. Submit form
```

### Add a Room to Hotel
```
1. Navigate to /dashboard/hotel
2. Find "Rooms" section
3. Click "Add Room"
4. Select room type (Single/Double/Suite)
5. Set bed size (3x6/4x6/6x6)
6. Set floor level (0-10)
7. Enter total rooms count
8. Submit form
```

### Create Rental Property
```
1. Navigate to /dashboard/properties
2. Click "Add Property"
3. Step 1: Enter basics (name, type, units)
4. Step 2: Select features (toggles + billing)
5. Step 3: Enter location (town, city, road)
6. Click "Save Property"
7. Apply for verification
```

### Verify Property
```
1. Go to "Verification" tab
2. Find your property
3. Click "Upload Proof"
4. Paste URL of deed/license document
5. Submit
6. Wait for admin review
```

---

## Testing Quick Links

### Test Accounts
```
Email:    test@example.com
Password: Test@123
Role:     Individual

Email:    hostel@example.com
Password: Hostel@123
Role:     Hostel Owner
```

### Test Endpoints
```bash
# Create hostel
curl -X POST http://localhost:3000/api/hostels \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","district":"Kampala"}'

# Search rentals
curl http://localhost:3000/api/rentals/search?q=apartment&city=Kampala

# Get verified hostels
curl http://localhost:3000/api/hostels/verified
```

---

## Troubleshooting

### Port Already in Use
```bash
# Find process using port 3000
lsof -i :3000
# Kill process
kill -9 <PID>
```

### Database Connection Error
```
Check:
1. MongoDB is running
2. MONGODB_URI in .env is correct
3. Network access allowed
```

### JWT Token Expired
```
- JWT expires after 24 hours
- User must login again
- New token issued on login
```

### Email Not Sent
```
Check:
1. GMAIL_USER in .env
2. GMAIL_PASSWORD is app password (not account password)
3. "Less secure apps" enabled if needed
```

### Form Not Submitting
```
Check:
1. All required fields filled
2. Browser console for errors
3. Network tab for API response
```

---

## Performance Tips

1. **Use Pagination**: Add `?limit=20&offset=0` to list endpoints
2. **Filter Search**: Use query params like `?type=2-bedroom&city=Kampala`
3. **Cache Images**: Serve from CDN in production
4. **Optimize Queries**: Indexes are built on key fields

---

## Security Reminders

- Always use HTTPS in production
- Keep `.env` file secret (never commit)
- Use strong passwords (12+ chars)
- Enable 2FA when available
- Regularly update dependencies
- Validate all user inputs

---

## File Locations Cheatsheet

```
Backend Code:
  - Authentication: src/auth/
  - Accounts: src/accounts/
  - Hostels: src/hostels/
  - Hotels: src/hotels/
  - Rentals: src/rentals/

Frontend Code:
  - Auth pages: views/auth/
  - Account pages: views/accounts/
  - Dashboards: views/dashboard/
  - Main layout: views/layout.ejs

Utilities:
  - Client-side: public/js/utils.js
  - Shared: lib/utils.ts

Documentation:
  - README.md
  - SETUP.md
  - IMPLEMENTATION.md
  - DEPLOYMENT.md
  - *_MODULE_DOCS.md files
```

---

## Keyboard Shortcuts

| Action | Key |
|--------|-----|
| Toggle dark mode | Cmd/Ctrl + Shift + D |
| Close modal | Esc |
| Save form | Cmd/Ctrl + Enter |
| Go back | Escape or Back button |

---

## Quick Stats

- **Setup Time**: 5 minutes
- **First Deploy**: 30 minutes
- **Total Endpoints**: 44+
- **Total Pages**: 12+
- **User Roles**: 5
- **Documentation**: Comprehensive

---

**Ready to launch? Start with SETUP.md!**
