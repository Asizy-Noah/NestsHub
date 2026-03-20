import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { AccountRole } from '../../accounts/schemas/account.schema';

@Injectable()
export class HostelRedirectMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // Check if user is authenticated (attached by JwtAuthGuard or similar)
    if (req.user && (req.user as any).role === AccountRole.HOSTEL_MANAGER) {
      // Redirect hostel managers from login to dashboard on successful login
      if (req.path === '/login' && res.headersSent === false) {
        return res.redirect('/dashboard/hostel');
      }
    }
    next();
  }
}
