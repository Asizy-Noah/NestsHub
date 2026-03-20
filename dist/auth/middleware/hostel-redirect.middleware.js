"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HostelRedirectMiddleware = void 0;
const common_1 = require("@nestjs/common");
const account_schema_1 = require("../../accounts/schemas/account.schema");
let HostelRedirectMiddleware = class HostelRedirectMiddleware {
    use(req, res, next) {
        if (req.user && req.user.role === account_schema_1.AccountRole.HOSTEL_MANAGER) {
            if (req.path === '/login' && res.headersSent === false) {
                return res.redirect('/dashboard/hostel');
            }
        }
        next();
    }
};
exports.HostelRedirectMiddleware = HostelRedirectMiddleware;
exports.HostelRedirectMiddleware = HostelRedirectMiddleware = __decorate([
    (0, common_1.Injectable)()
], HostelRedirectMiddleware);
//# sourceMappingURL=hostel-redirect.middleware.js.map