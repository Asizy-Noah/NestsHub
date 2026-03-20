import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  private readonly logger = new Logger('JwtStrategy');

  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        ExtractJwt.fromAuthHeaderAsBearerToken(),
        (request: Request) => {
          const cookieToken = request?.cookies?.accessToken;
          // Log only in dev mode to keep terminal clean
          if (cookieToken) console.log('DEBUG: Found accessToken in Cookie');
          return cookieToken;
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'your-secret-key', // CRITICAL: Ensure this matches AuthService
    });
  }

  async validate(payload: any) {
    this.logger.log(`Validating Payload: UserID: ${payload.sub}, Role: ${payload.role}`);
    
    if (!payload.sub || !payload.role) {
      this.logger.error('Validation Failed: Missing sub or role in token payload');
      throw new UnauthorizedException('Token payload is incomplete');
    }

    // This object becomes 'request.user'
    return {
      userId: payload.sub,
      email: payload.email,
      role: payload.role,
    };
  }
}