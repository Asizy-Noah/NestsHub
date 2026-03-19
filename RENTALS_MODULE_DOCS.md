# Rentals Module - Complete Documentation

## Overview

The Rentals Module is the final core component of the Real Estate platform, enabling Property Owners and Property Brokers to manage rental properties. This module provides a comprehensive shared dashboard where both roles can create, manage, and verify rental properties with detailed feature tracking, furnishing options, and billing responsibility configuration.

## Database Schema

### RentalProperty Schema (211 lines)

A comprehensive Mongoose schema that captures all rental property information:

**Manager & Basic Info:**
- `managerId`: Reference to Account (Owner or Broker)
- `propertyName`: Unique property identifier
- `description`: Property overview
- `monthlyRent`: Rental price in UGX

**Property Classification:**
- `houseType` (enum): Studio, 1-Bedroom, 2-Bedroom, 3-Bedroom, 4-Bedroom
- `buildingStyle` (enum): Flat/Storey, Single Level
- `unitCount`: Number of units in property

**Features (7 boolean toggles):**
- `isSelfContained`: Private facilities
- `isFenced`: Secure boundary
- `isCompoundPaved`: Paved compound
- `hasAmpleParking`: Parking availability
- `hasOutsideWashrooms`: External facilities
- `hasSecurity`: Security services
- `hasWater`: Water availability

**Furnishing Details:**
- `isFurnished`: Boolean toggle
- `furnitureList`: Array of furniture items (Bed, Sofa, Fridge, etc.)

**Billing Configuration (3 independent toggles):**
- `waterBillPaidBy` (enum): Tenant or Landlord
- `electricityBillPaidBy` (enum): Tenant or Landlord
- `securityFeePaidBy` (enum): Tenant or Landlord

**Location & Access:**
- `nearestTown`: Town location
- `nearestCity`: City location
- `nearestRoad`: Road identifier
- `accessRoadType` (enum): Tarmac or Murram/Gravel
- `distanceToTarmac`: Distance if road is Murram (km)

**Proximity Details:**
- `distanceToGym`: Narrative distance (e.g., "500m walk")
- `distanceToSupermarket`: Narrative distance
- `distanceToGroceries`: Narrative distance
- `shoppingCenterName`: Named shopping center

**Media:**
- `coverPhoto`: Property display image
- `gallery`: Array of property photos

**Contact Information:**
- `contactPerson`: Manager contact name
- `telephone`: Phone number
- `whatsapp`: WhatsApp number
- `email`: Email address

**Verification & Status:**
- `verificationStatus`: Unverified → Pending → Verified → Rejected
- `verificationAppliedAt`: Application timestamp
- `verificationApprovedAt`: Approval timestamp
- `verificationRejectionReason`: Rejection details
- `verificationProofUrl`: Document proof (deed/license)
- `isActive`: Boolean toggle

**Timestamps:**
- `createdAt`, `updatedAt`: Automatic timestamps

**Database Indexes:**
- Composite indexes on managerId, houseType, cities, verification status, and creation date for optimized queries.

## Backend Architecture

### Rentals Service (248 lines)

Core business logic with 14 methods:

**CRUD Operations:**
- `createRental()`: Add new property (validates role)
- `getRentalById()`: Fetch single property
- `updateRental()`: Edit property with authorization
- `deleteRental()`: Remove property
- `toggleRentalActive()`: Enable/disable listing

**Manager-Specific:**
- `getRentalsByManager()`: Paginated property list for logged-in user
- `getDashboardStats()`: Statistics, type distribution, recent properties

**Search & Discovery:**
- `searchRentals()`: Full-text search with filters (type, city, town, verified)
- `getVerifiedRentals()`: Public listing of verified properties

**Verification Flow:**
- `applyForVerification()`: Submit property for approval
- `uploadVerificationProof()`: Upload deed/license document

**Authorization:**
Every method includes checks to prevent cross-ownership manipulation. Only the property manager can modify their own properties.

### Rentals Controller (147 lines)

7 REST endpoints, all protected by JWT:

| Endpoint | Method | Role | Purpose |
|----------|--------|------|---------|
| `/api/rentals` | POST | Owner/Broker | Create property |
| `/api/rentals` | GET | Public | Search all |
| `/api/rentals/:id` | GET | Public | View details |
| `/api/rentals/:id` | PUT | Owner/Broker | Update property |
| `/api/rentals/:id` | DELETE | Owner/Broker | Delete property |
| `/api/rentals/my-properties` | GET | Owner/Broker | Manager's list |
| `/api/rentals/dashboard/stats` | GET | Owner/Broker | Dashboard data |
| `/api/rentals/:id/active` | PUT | Owner/Broker | Toggle active |
| `/api/rentals/:id/apply-verification` | POST | Owner/Broker | Apply for approval |
| `/api/rentals/:id/upload-proof` | POST | Owner/Broker | Upload document |
| `/api/rentals/verified` | GET | Public | Verified listings |

**Role-Based Access:**
- Both `PROPERTY_OWNER` and `PROPERTY_BROKER` roles have full access
- Public endpoints available for search and discovery
- Authorization checks on state-changing operations

### Rentals Module (18 lines)

Standard NestJS module with:
- MongoDB Mongoose integration
- Service and Controller registration
- Proper exports for app-level integration

## Frontend Dashboard

### Properties Dashboard (906 lines)

A comprehensive, responsive dashboard with 3 main tabs:

#### Overview Tab
- **Statistics Cards** (4 cards):
  - Total Properties
  - Verified Count
  - Pending Verification Count
  - Active Properties
- **Property Type Distribution**: Bar chart showing breakdown by house type
- Real-time statistics aggregation

#### Listings Tab
- **Property Grid**: Responsive cards (1-3 columns based on screen)
- **Card Elements**:
  - Cover photo with fallback placeholder
  - Verification status badge (colored)
  - Property name and type
  - Unit count
  - Location (City, Town)
  - Monthly rent in UGX
  - Edit and Delete buttons
- **Empty State**: Helpful message when no properties exist

#### Verification Tab
- **Information Banner**: Explains verification importance
- **Proof Upload Section**:
  - Lists unverified and pending properties
  - Upload button for each
  - Status indicators
- **Verification Status Display**: Current application state

### Multi-Step Add/Edit Form (906 lines total)

3-step wizard with progress tracker:

**Step 1: Property Basics**
- Property name input
- House type selector (segmented buttons, 5 options)
- Building style selector (2 options: Flat/Storey, Single Level)
- Unit count stepper
- Monthly rent input

**Step 2: Features & Utilities**
- 7 property feature checkboxes:
  - Self Contained
  - Fenced
  - Compound Paved
  - Ample Parking
  - Outside Washrooms
  - Security
  - Water Available
- Furnishing toggle with conditional furniture list (8 items)
- Billing responsibility 2-way toggles (3 independent):
  - Water Bill Paid By
  - Electricity Bill Paid By
  - Security Fee Paid By

**Step 3: Location & Proximity**
- Nearest Town & City inputs
- Nearest Road input
- Access Road Type selector (Tarmac vs Murram/Gravel)
- Conditional Distance to Tarmac (shows only if Murram selected)
- Proximity to Points of Interest (4 fields):
  - Distance to Gym
  - Distance to Supermarket
  - Distance to Groceries
  - Shopping Center Name
- Contact Information (4 fields):
  - Contact Person
  - Telephone
  - WhatsApp
  - Email

**Navigation:**
- Visual progress tracker at top
- Back/Next/Save buttons
- Cancel option available

### Interactive Features

**Alpine.js Components:**
- Form state management across 3 steps
- Conditional field visibility (Murram distance, furniture items)
- Real-time form validation indicators
- Loading states during save operations

**UX Enhancements:**
- Segmented button groups for exclusive selections (House Type, Road Type)
- Toggle switches for billing responsibility ("Tenant" vs "Landlord")
- Checkbox grids for feature selection
- Progress tracker with visual completion indicator
- Toast notifications for success/error feedback

**Dark Mode:**
- All form fields have dark: variants
- Consistent color scheme (Teal primary, Emerald success, Amber pending, Red danger)
- Proper contrast ratios maintained

## API Response Examples

### Create Rental
```json
POST /api/rentals
{
  "propertyName": "Luxury 3-Bedroom Apartment",
  "houseType": "3-bedroom",
  "buildingStyle": "flat_storey",
  "unitCount": 4,
  "monthlyRent": 1500000,
  "isSelfContained": true,
  "isFenced": true,
  "nearestCity": "Kampala",
  "nearestTown": "Makindye",
  "accessRoadType": "tarmac"
}

Response (201):
{
  "_id": "64a2b5c3d1f9e4a8c7b2a5f1",
  "managerId": "64a1c3b4e2f8d9a1b3c5e2f4",
  "propertyName": "Luxury 3-Bedroom Apartment",
  "houseType": "3-bedroom",
  "verificationStatus": "unverified",
  "isActive": true,
  "createdAt": "2024-07-15T10:30:00Z"
}
```

### Search Rentals
```json
GET /api/rentals/search?q=apartment&city=Kampala&verified=true

Response (200):
{
  "rentals": [
    {
      "_id": "64a2b5c3d1f9e4a8c7b2a5f1",
      "propertyName": "Luxury 3-Bedroom Apartment",
      "houseType": "3-bedroom",
      "nearestCity": "Kampala",
      "monthlyRent": 1500000,
      "verificationStatus": "verified",
      "managerId": {
        "_id": "64a1c3b4e2f8d9a1b3c5e2f4",
        "firstName": "John",
        "email": "john@example.com"
      }
    }
  ],
  "total": 45
}
```

### Dashboard Stats
```json
GET /api/rentals/dashboard/stats

Response (200):
{
  "overview": {
    "totalProperties": 8,
    "verifiedCount": 5,
    "pendingVerificationCount": 2,
    "activeCount": 7
  },
  "propertyTypes": [
    { "_id": "2-bedroom", "count": 3 },
    { "_id": "3-bedroom", "count": 2 },
    { "_id": "1-bedroom", "count": 2 },
    { "_id": "studio", "count": 1 }
  ],
  "recentProperties": [
    {
      "_id": "64a2b5c3d1f9e4a8c7b2a5f1",
      "propertyName": "Luxury Apartment",
      "verificationStatus": "verified"
    }
  ]
}
```

## Integration Points

### With Authentication Module
- All endpoints protected by JWT guard
- Role-based access control (PROPERTY_OWNER, PROPERTY_BROKER)
- Manager ID extracted from JWT payload

### With Accounts Module
- Manager reference links to Account document
- Population of manager info in search results
- Account validation on property creation

### Dashboard Navigation
- Accessible via `/dashboard/properties` route
- Redirect middleware for role-based access
- Sidebar integration (if applicable)

## Key Features

1. **Zero-Typing UI**: Segmented buttons for selections, toggles for features
2. **Dynamic Forms**: Conditional visibility based on selections (Murram distance, furniture items)
3. **Multi-Step Wizard**: Guided property creation with progress tracking
4. **Verification Hub**: Centralized document upload and status tracking
5. **Advanced Search**: Full-text search with type, location, and verification filters
6. **Dashboard Statistics**: Real-time aggregation of property metrics
7. **Dark Mode Support**: Complete dark mode implementation throughout
8. **Responsive Design**: Mobile-first, works on all screen sizes
9. **Role-Based Sharing**: Both Owners and Brokers use same interface with authorization
10. **Authorization Checks**: Managers can only modify their own properties

## Security Considerations

- **Authentication**: All endpoints require valid JWT token
- **Authorization**: Ownership verification on every modification
- **Input Validation**: DTOs validate all incoming data
- **Role Enforcement**: Only PROPERTY_OWNER and PROPERTY_BROKER roles allowed
- **Database Indexing**: Optimized queries with proper indexes
- **Error Handling**: Detailed error responses without exposing sensitive data

## File Structure

```
src/rentals/
├── schemas/
│   └── rental-property.schema.ts (211 lines)
├── dto/
│   └── create-rental.dto.ts (144 lines)
├── rentals.service.ts (248 lines)
├── rentals.controller.ts (147 lines)
└── rentals.module.ts (18 lines)

views/
└── dashboard/
    └── properties.ejs (906 lines)

public/js/
└── utils.js (with rentalUtils object)
```

## Total Implementation Statistics

- **Backend Code**: 768 lines (schema + DTOs + service + controller)
- **Frontend Code**: 906 lines (dashboard with 3 tabs + multi-step form)
- **Utilities**: 95 lines (rental-specific helpers)
- **Documentation**: This file
- **Total**: 1,769 lines of production code

All code follows NestJS and EJS best practices with comprehensive error handling, validation, and security checks.
