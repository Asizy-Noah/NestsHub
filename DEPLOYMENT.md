# Real Estate Application - Deployment Checklist

## Pre-Deployment Verification

### Backend Configuration
- [ ] Update `NODE_ENV` to `production`
- [ ] Generate strong `JWT_SECRET` (minimum 32 characters)
  ```bash
  node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
  ```
- [ ] Set production `MONGODB_URI` (MongoDB Atlas or other service)
- [ ] Configure production SMTP credentials
- [ ] Set correct `APP_URL` (your production domain)
- [ ] Verify all environment variables in `.env` are set
- [ ] Review CORS settings for production domain

### Frontend Optimization
- [ ] Minify CSS and JavaScript
- [ ] Optimize images for web
- [ ] Test dark mode functionality
- [ ] Test Alpine.js on all major browsers
- [ ] Verify responsive design on mobile devices

### Security Checklist
- [ ] Enable HTTPS/SSL certificate
- [ ] Set secure headers (HSTS, CSP, etc.)
- [ ] Verify password validation rules
- [ ] Test email verification process
- [ ] Test password reset flow
- [ ] Check rate limiting for login attempts
- [ ] Review database access controls
- [ ] Verify no sensitive data in logs

### Database Preparation
- [ ] Create production MongoDB database
- [ ] Set up database backups
- [ ] Create indexes for better performance
- [ ] Test database connection from production server
- [ ] Verify database user permissions
- [ ] Create database snapshots

### Email Service Setup
- [ ] Configure production SMTP provider
- [ ] Test email delivery
- [ ] Set up email templates
- [ ] Configure bounce handling
- [ ] Monitor email deliverability
- [ ] Set up email logs

### Testing Before Deployment
- [ ] Unit tests passing
- [ ] Integration tests passing
- [ ] End-to-end testing complete
- [ ] Test all authentication flows
  - [ ] Registration
  - [ ] Email verification
  - [ ] Password setup
  - [ ] Login
  - [ ] Password reset
  - [ ] Logout
- [ ] Test profile management
- [ ] Test with different user roles
- [ ] Load testing (optional)
- [ ] Security testing (penetration testing recommended)

## Deployment Steps

### Option 1: Vercel Deployment

#### Prerequisites
- Vercel account
- GitHub repository

#### Steps
```bash
# 1. Install Vercel CLI
npm i -g vercel

# 2. Link project to Vercel
vercel link

# 3. Set environment variables in Vercel dashboard
# - NODE_ENV
# - MONGODB_URI
# - JWT_SECRET
# - SMTP_* variables

# 4. Deploy
vercel --prod
```

#### Configuration
Create `vercel.json`:
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "env": {
    "NODE_ENV": "production"
  }
}
```

### Option 2: Heroku Deployment

#### Prerequisites
- Heroku account
- Heroku CLI installed

#### Steps
```bash
# 1. Create Heroku app
heroku create your-app-name

# 2. Set environment variables
heroku config:set NODE_ENV=production
heroku config:set JWT_SECRET=your-secret
heroku config:set MONGODB_URI=your-mongodb-uri
heroku config:set SMTP_HOST=smtp.provider.com
# ... set all SMTP variables

# 3. Create Procfile
echo "web: npm start" > Procfile

# 4. Deploy
git push heroku main
```

#### Procfile Example
```
web: node dist/main.js
```

### Option 3: AWS EC2 Deployment

#### Prerequisites
- AWS account
- EC2 instance (t3.micro or larger)
- Ubuntu 20.04 or newer

#### Steps
```bash
# 1. Connect to instance
ssh -i your-key.pem ec2-user@your-instance.com

# 2. Install Node.js
curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
sudo apt-get install -y nodejs

# 3. Install MongoDB (or use Atlas)
sudo apt-get install -y mongodb

# 4. Clone repository
git clone your-repo.git
cd your-repo

# 5. Install dependencies
npm install

# 6. Create .env file
sudo nano .env
# Add all production environment variables

# 7. Build application
npm run build

# 8. Setup PM2 for process management
sudo npm install -g pm2
pm2 start dist/main.js --name "real-estate"
pm2 startup
pm2 save

# 9. Setup Nginx as reverse proxy
sudo apt-get install -y nginx
# Configure Nginx to forward requests to port 3000

# 10. Setup SSL with Let's Encrypt
sudo apt-get install -y certbot python3-certbot-nginx
sudo certbot certonly --nginx -d your-domain.com
```

#### Nginx Configuration
```nginx
server {
    listen 80;
    server_name your-domain.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl;
    server_name your-domain.com;

    ssl_certificate /etc/letsencrypt/live/your-domain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/your-domain.com/privkey.pem;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### Option 4: Docker Deployment

#### Create Dockerfile
```dockerfile
FROM node:16-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["node", "dist/main.js"]
```

#### Create docker-compose.yml
```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      NODE_ENV: production
      MONGODB_URI: mongodb://mongo:27017/real-estate
      JWT_SECRET: ${JWT_SECRET}
    depends_on:
      - mongo

  mongo:
    image: mongo:5.0
    volumes:
      - mongo-data:/data/db
    environment:
      MONGO_INITDB_DATABASE: real-estate

volumes:
  mongo-data:
```

#### Deploy
```bash
docker-compose up -d
```

## Post-Deployment

### Verification
- [ ] Application loads successfully
- [ ] All routes respond correctly
- [ ] Database connection working
- [ ] Email sending working
- [ ] Authentication flows complete
- [ ] No console errors
- [ ] SSL certificate valid
- [ ] HTTPS redirects working

### Monitoring Setup
- [ ] Monitor application logs
- [ ] Set up error tracking (Sentry)
- [ ] Monitor database performance
- [ ] Track API response times
- [ ] Monitor server resources (CPU, memory, disk)
- [ ] Email delivery monitoring

### Backup Configuration
- [ ] Database backups scheduled (daily)
- [ ] Application code backed up
- [ ] Test restore procedure
- [ ] Document backup location
- [ ] Set retention policy

### Security Hardening
- [ ] Configure Web Application Firewall (WAF)
- [ ] Set up rate limiting
- [ ] Enable request logging
- [ ] Configure security headers
- [ ] Set up vulnerability scanning
- [ ] Enable audit logging

### Performance Monitoring
- [ ] Set up CDN (optional)
- [ ] Configure caching headers
- [ ] Monitor Core Web Vitals
- [ ] Set up performance alerts
- [ ] Monitor database query performance

## Maintenance Schedule

### Daily
- [ ] Check application logs for errors
- [ ] Monitor server resources
- [ ] Check email delivery status

### Weekly
- [ ] Review security logs
- [ ] Check database performance
- [ ] Verify backups completed
- [ ] Review API usage metrics

### Monthly
- [ ] Security updates and patches
- [ ] Dependency updates (with testing)
- [ ] Database optimization
- [ ] User feedback review

### Quarterly
- [ ] Security audit
- [ ] Performance optimization
- [ ] Disaster recovery test
- [ ] Capacity planning review

## Troubleshooting Deployment Issues

### Application Won't Start
```bash
# Check logs
npm run dev

# Check environment variables
echo $MONGODB_URI
echo $JWT_SECRET

# Verify MongoDB connection
mongosh "your-connection-string"
```

### Email Not Working
- Verify SMTP credentials
- Check firewall rules
- Review email logs
- Test with different email provider
- Check spam folder

### Database Connection Issues
- Verify connection string
- Check network/firewall rules
- Verify database user permissions
- Test connection from local machine
- Check database status

### SSL Certificate Issues
- Verify certificate validity
- Check certificate expiration
- Renew certificate if expired
- Verify domain ownership
- Check CNAME/A records

### Performance Issues
- Check server resources (CPU, memory)
- Optimize database queries
- Enable caching
- Use CDN for static assets
- Upgrade server if needed

## Rollback Procedure

If issues arise after deployment:

```bash
# 1. Identify the issue
# Review logs and error messages

# 2. Rollback to previous version
git revert HEAD
npm install
npm run build

# 3. Redeploy
# Follow your deployment procedure

# 4. Monitor closely
# Watch for errors and issues

# 5. Root cause analysis
# Understand what went wrong
# Implement fixes
```

## Production Environment Variables

Keep these in a secure vault (never in code):
- `JWT_SECRET`
- `MONGODB_URI`
- `SMTP_USER`
- `SMTP_PASS`
- Database passwords
- API keys

## Support and Documentation

### Useful Links
- [NestJS Documentation](https://docs.nestjs.com)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- [Vercel Deployment](https://vercel.com/docs)
- [Heroku Deployment](https://devcenter.heroku.com)
- [AWS Deployment](https://aws.amazon.com)

### Contact Information
- Development Team: [your-email]
- DevOps Team: [devops-email]
- Support Ticket: [support-link]

---

**Last Updated**: [Current Date]
**Version**: 1.0.0
**Status**: Production Ready
