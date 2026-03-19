# Real Estate Management System

A comprehensive web application for managing real estate properties, hostels, hotels, and accommodations with complete authentication and user management.

## Features

- **User Authentication**: Complete registration, email verification, and password management
- **Multi-Role Support**: Individual, Hostel Owner, Hotel Owner, and Property Manager roles
- **Secure Authentication**: JWT-based authentication with bcrypt password hashing
- **Email Notifications**: Email verification and password reset functionality
- **Responsive Design**: Mobile-first design using Tailwind CSS
- **Dark Mode Support**: Built-in dark mode toggle
- **Alpine.js Interactivity**: Lightweight frontend interactivity without React
- **EJS Templates**: Server-side rendering with EJS templates

## Tech Stack

### Backend
- **NestJS**: Progressive Node.js framework
- **MongoDB**: Document database
- **Mongoose**: MongoDB ODM
- **JWT**: JSON Web Token authentication
- **bcryptjs**: Password hashing
- **Nodemailer**: Email sending

### Frontend
- **EJS**: Embedded JavaScript templates
- **Alpine.js**: Lightweight JavaScript framework
- **Tailwind CSS**: Utility-first CSS framework
- **HTML5**: Semantic markup

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- SMTP credentials for email functionality

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd real-estate-app
```

2. Install dependencies:
```bash
npm install
# or
pnpm install
```

3. Create `.env` file from `.env.example`:
```bash
cp .env.example .env
```

4. Configure environment variables in `.env`:
```env
NODE_ENV=development
PORT=3000
APP_URL=http://localhost:3000
MONGODB_URI=mongodb://localhost:27017/real-estate
JWT_SECRET=your-secret-key
SMTP_HOST=smtp.mailtrap.io
SMTP_PORT=2525
SMTP_USER=your_username
SMTP_PASS=your_password
```

5. Start the application:
```bash
npm run dev
# or
pnpm dev
```

The application will be available at `http://localhost:3000`

## Project Structure

```
real-estate-app/
├── src/
│   ├── main.ts                 # Application entry point
│   ├── app.module.ts           # Root module
│   ├── app.controller.ts       # Root controller
│   ├── auth/                   # Authentication module
│   │   ├── auth.service.ts
│   │   ├── auth.controller.ts
│   │   ├── auth.module.ts
│   │   ├── email.service.ts
│   │   ├── guards/
│   │   ├── strategies/
│   │   └── dto/
│   └── accounts/               # Accounts module
│       ├── accounts.service.ts
│       ├── accounts.controller.ts
│       ├── accounts.module.ts
│       ├── schemas/
│       └── dto/
├── views/                      # EJS templates
│   ├── layout.ejs             # Main layout
│   ├── index.ejs              # Home page
│   ├── auth/                  # Authentication pages
│   └── accounts/              # Account pages
├── public/                     # Static assets
├── .env.example               # Environment variables template
├── tsconfig.json              # TypeScript configuration
└── package.json               # Dependencies
```

## Authentication Flow

### Registration
1. User fills in basic information (name, email, role)
2. System generates email verification token
3. Email sent with verification link
4. User verifies email via link
5. User sets password with validation
6. Account becomes active

### Login
1. User enters email and password
2. Credentials validated
3. JWT token issued
4. User redirected to dashboard

### Password Reset
1. User requests password reset
2. Email sent with reset link
3. User clicks link and enters new password
4. Password updated and user can login

## API Endpoints

### Authentication
- `GET /auth/register` - Registration page
- `POST /auth/register` - Register new account
- `GET /auth/verify-email` - Email verification page
- `POST /auth/verify-email` - Verify email with token
- `POST /auth/set-password` - Set password after verification
- `GET /auth/login` - Login page
- `POST /auth/login` - Authenticate user
- `GET /auth/forgot-password` - Forgot password page
- `POST /auth/forgot-password` - Initiate password reset
- `GET /auth/reset-password` - Reset password page
- `POST /auth/reset-password` - Reset password with token

### Accounts
- `GET /accounts/dashboard` - User dashboard
- `GET /accounts/profile` - Profile page
- `GET /accounts/settings` - Settings page
- `GET /accounts/:id` - Get account details
- `PATCH /accounts/:id` - Update account
- `DELETE /accounts/:id` - Delete account

## Database Schema

### Account Collection
```javascript
{
  email: String (unique),
  firstName: String,
  lastName: String,
  role: String (enum: individual, hostel_owner, hotel_owner, property_manager),
  status: String,
  passwordHash: String,
  emailVerified: Boolean,
  phoneNumber: String,
  profilePicture: String,
  // Role-specific fields
  hostelName: String,
  hostelAddress: String,
  hotelName: String,
  hotelAddress: String,
  createdAt: Date,
  updatedAt: Date
}
```

## Password Requirements

Passwords must contain:
- Minimum 8 characters
- At least one uppercase letter
- At least one lowercase letter
- At least one number
- At least one special character (@$!%*?&)

## Security Features

- JWT authentication with 24-hour expiration
- Bcrypt password hashing with salt rounds
- Email token validation with 24-hour expiration
- Password reset token with 1-hour expiration
- CORS enabled for development
- Input validation with class-validator
- SQL injection prevention with Mongoose

## Error Handling

The application provides comprehensive error handling:
- Validation errors with detailed messages
- Authentication errors with appropriate HTTP status codes
- Database errors with fallback messages
- Email sending failures with logging

## Development

### Running Tests
```bash
npm run test
npm run test:watch
npm run test:cov
```

### Code Formatting
```bash
npm run format
```

### Linting
```bash
npm run lint
```

## Deployment

### Environment Variables for Production
- Set `NODE_ENV=production`
- Generate strong `JWT_SECRET`
- Configure production MongoDB URI
- Set up production SMTP credentials
- Update `APP_URL` to production domain

### Build for Production
```bash
npm run build
npm start
```

## Contributing

1. Create a feature branch
2. Make your changes
3. Submit a pull request

## License

MIT

## Support

For support, please contact the development team or open an issue in the repository.

## Changelog

### Version 1.0.0
- Initial release with complete authentication system
- Email verification and password reset
- Multi-role user support
- Dashboard and profile management
- Dark mode support
