# Real Estate Application - Setup Guide

## Quick Start

### Step 1: Prerequisites
Make sure you have installed:
- Node.js (v16+)
- npm or pnpm
- MongoDB (local or MongoDB Atlas account)

### Step 2: Install Dependencies
```bash
pnpm install
# or
npm install
```

### Step 3: Environment Setup

Copy the example environment file:
```bash
cp .env.example .env
```

Edit `.env` with your configuration:

```env
# Application Settings
NODE_ENV=development
PORT=3000
APP_URL=http://localhost:3000

# Database Connection
# For local MongoDB:
MONGODB_URI=mongodb://localhost:27017/real-estate

# For MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster0.mongodb.net/real-estate?retryWrites=true&w=majority

# JWT Secret (generate a strong random string)
JWT_SECRET=your-super-secret-key-change-this-in-production

# Email Configuration (using Mailtrap for testing)
SMTP_HOST=smtp.mailtrap.io
SMTP_PORT=2525
SMTP_USER=your_mailtrap_username
SMTP_PASS=your_mailtrap_password
SMTP_FROM=noreply@realestate.com
```

### Step 4: Database Setup

#### Option A: Local MongoDB
```bash
# Start MongoDB (macOS with Homebrew)
brew services start mongodb-community

# Or on Linux
sudo systemctl start mongod

# Or with Docker
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

#### Option B: MongoDB Atlas
1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free account
3. Create a cluster
4. Get connection string
5. Update `MONGODB_URI` in `.env`

### Step 5: Email Service Setup

#### Option A: Mailtrap (Recommended for Development)
1. Go to https://mailtrap.io
2. Sign up for free account
3. Create a new inbox
4. Copy SMTP credentials
5. Update `SMTP_*` variables in `.env`

#### Option B: Gmail
1. Enable 2-Factor Authentication on Gmail
2. Generate App Password
3. Update SMTP variables:
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
```

#### Option C: Other SMTP Providers
Configure based on your provider's documentation

### Step 6: Start Development Server

```bash
# Start the application in watch mode
pnpm dev
# or
npm run dev
```

The application will be available at `http://localhost:3000`

## Features to Test

### 1. Registration
- Navigate to `http://localhost:3000/auth/register`
- Fill in the registration form with 3 steps:
  1. Personal information
  2. Role selection
  3. Confirmation
- Submit and check your email (Mailtrap) for verification link

### 2. Email Verification
- Click the verification link from the email
- You'll be redirected to set your password

### 3. Set Password
- Enter a strong password meeting requirements:
  - At least 8 characters
  - Contains uppercase, lowercase, number, and special character
- Confirm password
- Submit to activate account

### 4. Login
- Go to `http://localhost:3000/auth/login`
- Use registered email and password
- Access the dashboard at `http://localhost:3000/accounts/dashboard`

### 5. Profile Management
- View and edit profile at `http://localhost:3000/accounts/profile`
- Fill in role-specific information
- Changes save to database

### 6. Password Reset
- Go to `http://localhost:3000/auth/forgot-password`
- Enter your email
- Check email for reset link
- Click link and set new password

## Troubleshooting

### MongoDB Connection Issues
- Verify MongoDB is running: `mongosh`
- Check connection string in `.env`
- Ensure firewall allows connection to port 27017

### Email Not Sending
- Check SMTP credentials in `.env`
- Verify email service account is active
- Check application logs for errors
- Try with different SMTP provider

### Port Already in Use
```bash
# Find process using port 3000
lsof -i :3000

# Kill the process
kill -9 <PID>

# Or use different port
PORT=3001 pnpm dev
```

### Module Not Found
```bash
# Clear node_modules and reinstall
rm -rf node_modules
pnpm install
```

## Environment Variables Reference

| Variable | Description | Example |
|----------|-------------|---------|
| NODE_ENV | Node environment | development, production |
| PORT | Server port | 3000 |
| APP_URL | Application URL | http://localhost:3000 |
| MONGODB_URI | MongoDB connection string | mongodb://localhost:27017/real-estate |
| JWT_SECRET | JWT signing secret | strong-random-key |
| SMTP_HOST | SMTP server host | smtp.mailtrap.io |
| SMTP_PORT | SMTP server port | 2525 |
| SMTP_USER | SMTP username | username |
| SMTP_PASS | SMTP password | password |
| SMTP_FROM | Sender email address | noreply@realestate.com |

## Production Deployment

### Before Deployment
1. Set `NODE_ENV=production`
2. Generate strong `JWT_SECRET`
3. Use production MongoDB URI
4. Configure production SMTP
5. Set proper `APP_URL`

### Build for Production
```bash
npm run build
npm start
```

### Deployment Platforms
- Vercel
- Heroku
- Railway
- Render
- AWS EC2
- DigitalOcean

## Additional Resources

- [NestJS Documentation](https://docs.nestjs.com)
- [MongoDB Documentation](https://docs.mongodb.com)
- [Alpine.js Documentation](https://alpinejs.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com)
- [EJS Template Documentation](https://ejs.co)

## Support

For issues or questions:
1. Check the README.md
2. Review error logs
3. Check email service dashboard
4. Verify database connection

## Next Steps

1. Customize the application branding
2. Add more property management features
3. Implement payment processing
4. Add booking system
5. Set up automated backups

---

Happy coding! If you encounter any issues, please refer to the documentation or create an issue in the repository.
