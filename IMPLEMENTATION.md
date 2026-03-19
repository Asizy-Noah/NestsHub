# Real Estate Authentication System - Implementation Guide

## Overview

This document provides a comprehensive guide to the authentication system implementation using NestJS backend with EJS templates and Alpine.js frontend.

## Architecture

```
┌─────────────────┐
│   EJS Templates │ (Server-side rendering)
│   Alpine.js     │ (Client-side interactivity)
│   Tailwind CSS  │ (Styling)
└────────┬────────┘
         │ HTTP/REST API
         ▼
┌─────────────────┐
│   NestJS        │ (API Server)
│   Controllers   │ (Route handlers)
│   Services      │ (Business logic)
│   Guards        │ (Authentication)
│   Middleware    │ (Request processing)
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   MongoDB       │ (Data storage)
│   Mongoose      │ (ODM)
└─────────────────┘
```

## Authentication Flow Diagram

```
User Registration Flow:
┌─────────────┐
│   Register  │ POST /auth/register
│   Form      │ → Validation → Create Account
└──────┬──────┘                 → Generate Token
       │                        → Send Email
       ▼
┌──────────────────────┐
│ Email Verification   │ GET /auth/verify-email?token=xxx
│ Link Click           │ → Validate Token
└──────┬───────────────┘ → Update Status
       │                → Redirect to Set Password
       ▼
┌──────────────────────┐
│ Set Password         │ POST /auth/set-password
│ Form                 │ → Validate Password Rules
└──────┬───────────────┘ → Hash Password
       │                → Activate Account
       ▼
┌──────────────────────┐
│ Login Form           │ POST /auth/login
│ (Ready to Use)       │ → Validate Credentials
└──────┬───────────────┘ → Issue JWT Token
       │                → Store Token in LocalStorage
       ▼
┌──────────────────────┐
│ Dashboard            │ GET /accounts/dashboard
│ (Authenticated)      │ → Check JWT Token
└──────────────────────┘ → Render Protected Page
```

## File Structure and Descriptions

### Backend Files

#### Core Application Files
- `src/main.ts` - Entry point, configures EJS view engine
- `src/app.module.ts` - Root module importing Auth and Accounts modules
- `src/app.controller.ts` - Root routes (home, about)

#### Authentication Module (`src/auth/`)
- `auth.service.ts` - Business logic for registration, login, password reset
- `auth.controller.ts` - HTTP endpoints for auth routes
- `email.service.ts` - Email sending functionality via Nodemailer
- `auth.module.ts` - Module configuration
- `strategies/jwt.strategy.ts` - JWT validation strategy
- `guards/jwt-auth.guard.ts` - Route protection guard
- `middleware/auth.middleware.ts` - Optional middleware for token extraction
- `dto/` - Data transfer objects for validation

#### Accounts Module (`src/accounts/`)
- `accounts.service.ts` - Business logic for account management
- `accounts.controller.ts` - Account management routes
- `schemas/account.schema.ts` - MongoDB schema and enums

### Frontend Files

#### Templates
- `views/layout.ejs` - Main layout with navigation and dark mode
- `views/index.ejs` - Home page
- `views/about.ejs` - About page
- `views/auth/register.ejs` - Registration with 3-step wizard
- `views/auth/login.ejs` - Login form
- `views/auth/verify-email.ejs` - Email verification
- `views/auth/set-password.ejs` - Password setup
- `views/auth/forgot-password.ejs` - Forgot password request
- `views/auth/reset-password.ejs` - Password reset
- `views/accounts/dashboard.ejs` - User dashboard
- `views/accounts/profile.ejs` - Profile edit with role-specific fields
- `views/accounts/settings.ejs` - Account settings and security

#### Scripts
- `public/js/utils.js` - Shared utility functions for API calls, validation, storage

## Key Implementation Details

### 1. Password Hashing

```typescript
// In auth.service.ts
const salt = await bcrypt.genSalt(10);
const passwordHash = await bcrypt.hash(password, salt);
```

- Uses bcryptjs with 10 salt rounds
- Never stores plain text passwords
- Uses compare() for verification

### 2. Email Verification

```typescript
// Generate token on registration
const emailVerificationToken = uuid();
const emailVerificationExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000);

// Verify on email click
const account = await this.accountModel.findOne({
  emailVerificationToken: token,
  emailVerificationExpiry: { $gt: Date.now() },
});
```

- Tokens expire after 24 hours
- One-time use tokens
- Status changes to PENDING_PASSWORD_SET after verification

### 3. JWT Authentication

```typescript
// Token generation on login
const token = this.jwtService.sign(
  {
    sub: account._id,
    email: account.email,
    role: account.role,
  },
  { expiresIn: '24h' },
);

// Validation on protected routes
@UseGuards(JwtAuthGuard)
async getCurrentUser(@Request() req) {
  return req.user;
}
```

- 24-hour token expiration
- Payload includes user ID, email, and role
- Sent via Authorization header as Bearer token

### 4. Password Reset Flow

```typescript
// Step 1: Generate reset token
const resetToken = uuid();
const resetExpiry = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

// Step 2: Send email with reset link
await this.emailService.sendPasswordResetEmail(email, firstName, resetToken);

// Step 3: Validate token and update password
const account = await this.accountModel.findOne({
  passwordResetToken: token,
  passwordResetExpiry: { $gt: Date.now() },
});
```

- Tokens expire after 1 hour
- Single use tokens
- Secure token generation using UUID

### 5. Role-Based Fields

```typescript
// Hostel Owner specific
hostelName: String;
hostelAddress: String;
hostelCity: String;
hostelCountry: String;

// Hotel Owner specific
hotelName: String;
hotelAddress: String;
hotelCity: String;
hotelCountry: String;
hotelStarRating: Number;
```

All role-specific fields are stored in same collection using role discriminator

### 6. Alpine.js Data Components

```javascript
// Example: Registration form with Alpine.js
x-data="registerForm()"
x-cloak  // Hide until Alpine loads

// Data object
function registerForm() {
  return {
    currentStep: 1,
    loading: false,
    error: '',
    formData: { ... },
    
    async submitForm() {
      // API call using fetch
      // Error handling
      // Success redirect
    }
  };
}
```

- Uses x-data for component state
- Async API calls with error handling
- Form validation before submission

## API Response Format

### Success Response
```json
{
  "message": "Account created successfully",
  "accountId": "507f1f77bcf86cd799439011"
}
```

### Error Response
```json
{
  "statusCode": 400,
  "message": "Email already registered",
  "error": "Bad Request"
}
```

### Login Response
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "role": "individual"
  }
}
```

## Security Considerations

### 1. Password Policy
- Minimum 8 characters
- Must contain: uppercase, lowercase, number, special character
- Validated on both frontend and backend

### 2. Token Management
- Stored in localStorage (frontend)
- Sent in Authorization header
- Expires after 24 hours
- Never exposed in logs or error messages

### 3. Email Verification
- Prevents fake email registration
- Tokens expire automatically
- Status updates prevent double verification

### 4. CORS
- Enabled for development
- Should be restricted in production
- Set specific allowed origins

### 5. Input Validation
- class-validator for DTO validation
- Email format validation
- Trimming and lowercasing of emails

## Testing the System

### 1. Test Registration
```bash
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "firstName": "Test",
    "lastName": "User",
    "role": "individual"
  }'
```

### 2. Test Email Verification
- Check Mailtrap inbox for verification email
- Extract token from URL in email
- Navigate to verification URL

### 3. Test Password Setup
- After email verification, set password with valid requirements

### 4. Test Login
```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "SecurePass123!"
  }'
```

### 5. Test Protected Route
```bash
curl http://localhost:3000/accounts/me \
  -H "Authorization: Bearer <token>"
```

## Environment Setup for Different Services

### Email Services
- **Mailtrap**: Best for development, instant dashboard access
- **Gmail**: Free with App Password, good for testing
- **SendGrid**: Production ready with good documentation
- **AWS SES**: Scalable, cost-effective for high volume

### Database Services
- **MongoDB Atlas**: Hosted, free tier available
- **MongoDB Community**: Local development
- **Docker Compose**: Easy multi-service setup

## Common Issues and Solutions

### Issue: "Email already registered"
- Check database for duplicate emails
- Email comparison is case-insensitive
- Solution: Use unique constraint on MongoDB

### Issue: "Invalid or expired verification token"
- Token may have expired (24 hours)
- Request new registration
- Check email for correct link

### Issue: "Password reset link doesn't work"
- Token expires after 1 hour
- Request new password reset
- Check browser console for errors

### Issue: "CORS error"
- Check origin is whitelisted
- Credentials may be needed
- Ensure correct HTTP methods

## Performance Optimization

### 1. Database Indexes
```javascript
// Indexes in schema for faster queries
email: { index: true, unique: true }
emailVerificationToken: { index: true }
passwordResetToken: { index: true }
```

### 2. Caching
- Cache user data in localStorage
- Reduce API calls for repeated requests
- Clear on logout

### 3. Lazy Loading
- Load JavaScript only when needed
- Separate scripts for different pages
- Minify for production

## Monitoring and Logging

### Console Logging
```typescript
// In auth.service.ts
this.logger.log(`User registered: ${email}`);
this.logger.error(`Failed to send email: ${error.message}`);
```

### Error Tracking
- Implement Sentry or similar service
- Log all API errors
- Track failed login attempts

## Maintenance and Updates

### Regular Tasks
1. Monitor failed login attempts
2. Review inactive accounts
3. Rotate JWT secret periodically
4. Update dependencies monthly

### Database Backups
```bash
# MongoDB backup
mongodump --uri "mongodb://..." --out ./backups

# MongoDB restore
mongorestore --uri "mongodb://..." ./backups
```

## Extending the System

### Add Two-Factor Authentication
1. Install TOTP library
2. Add twoFactorSecret field to Account schema
3. Update login flow to check 2FA
4. Add QR code generation in settings

### Add OAuth Integration
1. Install passport strategy
2. Add OAuth controller
3. Link to existing account
4. Update registration flow

### Add Role-Based Access Control
1. Update guards with role checking
2. Add permission decorators
3. Implement permission middleware
4. Update database with permissions

---

This implementation provides a secure, production-ready authentication system that can be extended with additional features as needed.
