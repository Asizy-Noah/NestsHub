"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const app_service_1 = require("./app.service");
let AppController = class AppController {
    constructor(appService) {
        this.appService = appService;
    }
    getHomePage() {
        return {
            title: 'NestHub Uganda | Find Your Perfect Space',
            layout: 'layouts/public'
        };
    }
    getSearchResults(query, category) {
        return {
            title: `Search Results | NestHub`,
            layout: 'layouts/public',
            searchQuery: query || '',
            category: category || 'all'
        };
    }
    getHostelRoom(id) {
        return { title: 'Hostel Room Details', layout: 'layouts/public', roomId: id };
    }
    getHotelRoom(id) {
        return { title: 'Hotel Room Details', layout: 'layouts/public', roomId: id };
    }
    getRentalItem(id) {
        return { title: 'Rental Property Details', layout: 'layouts/public', itemId: id };
    }
    getHostelProfile(id) {
        return { title: 'Hostel Profile', layout: 'layouts/public', hostelId: id };
    }
    getHotelProfile(id) {
        return { title: 'Hotel Profile', layout: 'layouts/public', hotelId: id };
    }
    getBrokerProfile(id) {
        return { title: 'Broker Profile', layout: 'layouts/public', brokerId: id };
    }
    getPublicReviews(targetId) {
        return { title: 'Public Reviews', layout: 'layouts/public', targetId };
    }
    getAbout() {
        return { title: 'About Us' };
    }
};
exports.AppController = AppController;
__decorate([
    (0, common_1.Get)(),
    (0, common_1.Render)('index'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getHomePage", null);
__decorate([
    (0, common_1.Get)('search'),
    (0, common_1.Render)('results'),
    __param(0, (0, common_1.Query)('q')),
    __param(1, (0, common_1.Query)('category')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getSearchResults", null);
__decorate([
    (0, common_1.Get)('public/hostels/room/:id'),
    (0, common_1.Render)('hostel-details'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getHostelRoom", null);
__decorate([
    (0, common_1.Get)('public/hotels/room/:id'),
    (0, common_1.Render)('hotel-details'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getHotelRoom", null);
__decorate([
    (0, common_1.Get)('public/rentals/item/:id'),
    (0, common_1.Render)('rental-details'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getRentalItem", null);
__decorate([
    (0, common_1.Get)('public/hostels/:id'),
    (0, common_1.Render)('hostel'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getHostelProfile", null);
__decorate([
    (0, common_1.Get)('public/hotels/:id'),
    (0, common_1.Render)('hotel'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getHotelProfile", null);
__decorate([
    (0, common_1.Get)('public/brokers/:id'),
    (0, common_1.Render)('rental'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getBrokerProfile", null);
__decorate([
    (0, common_1.Get)('public/reviews/:targetId'),
    (0, common_1.Render)('reviews'),
    __param(0, (0, common_1.Param)('targetId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getPublicReviews", null);
__decorate([
    (0, common_1.Get)('about'),
    (0, common_1.Render)('about'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getAbout", null);
exports.AppController = AppController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [app_service_1.AppService])
], AppController);
//# sourceMappingURL=app.controller.js.map