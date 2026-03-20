import { NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
export declare class HostelRedirectMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction): void;
}
//# sourceMappingURL=hostel-redirect.middleware.d.ts.map