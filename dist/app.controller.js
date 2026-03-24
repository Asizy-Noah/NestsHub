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
const hostels_service_1 = require("./hostels/hostels.service");
const hotels_service_1 = require("./hotels/hotels.service");
const rentals_service_1 = require("./rentals/rentals.service");
let AppController = class AppController {
    constructor(appService, hostelsService, hotelsService, rentalsService) {
        this.appService = appService;
        this.hostelsService = hostelsService;
        this.hotelsService = hotelsService;
        this.rentalsService = rentalsService;
    }
    async getHomePage() {
        const rawHostelRooms = await this.hostelsService['roomModel'].find({ availableRooms: { $gt: 0 } }).exec();
        const rawHostels = await this.hostelsService['hostelModel'].find().exec();
        const hostels = rawHostelRooms.map((room) => {
            const parent = rawHostels.find((h) => h._id && room.hostelId && h._id.toString() === room.hostelId.toString());
            const amenities = [];
            if (room.isSelfContained)
                amenities.push({ icon: 'fa-bath', text: 'Self Contained' });
            if (parent?.amenities?.freeInternet)
                amenities.push({ icon: 'fa-wifi', text: 'Free WiFi' });
            if (parent?.amenities?.freeTransport)
                amenities.push({ icon: 'fa-van-shuttle', text: 'Transport' });
            if (room.hasAC)
                amenities.push({ icon: 'fa-snowflake', text: 'AC' });
            return {
                id: room._id,
                url: `/public/hostels/room/${room._id}`,
                title: `${room.type} Room at ${parent?.name || 'Premium Hostel'}`,
                location: `${parent?.popularAreaName || ''}, ${parent?.locationName || ''}`,
                locationFilter: parent?.locationName || 'Kampala',
                price: room.price,
                period: room.pricingPeriod || 'Semester',
                image: room.photos?.[0] || parent?.gallery?.[0] || 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=400',
                badge: parent?.isVerified ? 'Verified' : null,
                amenities: amenities.slice(0, 3)
            };
        });
        const rawHotelRooms = await this.hotelsService['roomModel'].find({ availableRooms: { $gt: 0 } }).exec();
        const rawHotels = await this.hotelsService['hotelModel'].find().exec();
        const hotels = rawHotelRooms.map((room) => {
            const parent = rawHotels.find((h) => h._id && room.hotelId && h._id.toString() === room.hotelId.toString());
            const amenities = [];
            if (room.bedAndBreakfast)
                amenities.push({ icon: 'fa-mug-hot', text: 'Breakfast' });
            if (room.hasAC)
                amenities.push({ icon: 'fa-snowflake', text: 'AC' });
            if (room.hotWater)
                amenities.push({ icon: 'fa-shower', text: 'Hot Water' });
            if (parent?.amenities?.freeInternet)
                amenities.push({ icon: 'fa-wifi', text: 'Free WiFi' });
            return {
                id: room._id,
                url: `/public/hotels/room/${room._id}`,
                title: `${room.type} at ${parent?.name || 'Luxury Hotel'}`,
                location: `${parent?.street || ''}, ${parent?.districtOrCity || ''}`,
                locationFilter: parent?.districtOrCity || 'Kampala',
                price: room.price,
                period: 'Night',
                image: room.photos?.[0] || parent?.gallery?.[0] || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400',
                badge: parent?.isVerified ? 'Verified' : null,
                amenities: amenities.slice(0, 3)
            };
        });
        const rawRentals = await this.rentalsService['rentalModel'].find({ availableUnits: { $gt: 0 } }).exec();
        const rentals = rawRentals.map((rental) => {
            const amenities = [];
            if (rental.isSelfContained)
                amenities.push({ icon: 'fa-bath', text: 'Self Contained' });
            if (rental.fenced)
                amenities.push({ icon: 'fa-shield-halved', text: 'Fenced' });
            if (rental.parking)
                amenities.push({ icon: 'fa-square-parking', text: 'Parking' });
            if (rental.hasAC)
                amenities.push({ icon: 'fa-snowflake', text: 'AC' });
            return {
                id: rental._id,
                url: `/public/rentals/item/${rental._id}`,
                title: `${rental.category} in ${rental.propertyType}`,
                location: `${rental.popularAreaName || ''}, ${rental.district || ''}`,
                locationFilter: rental.district || 'Kampala',
                price: rental.price,
                period: rental.rateType || 'Month',
                image: rental.unitPhotos?.[0] || rental.propertyPhotos?.[0] || 'https://images.unsplash.com/photo-1502672260266-1c1e541818bd?w=400',
                badge: 'Available',
                amenities: amenities.slice(0, 3)
            };
        });
        return {
            title: 'NestHub Uganda | Find Your Perfect Space',
            layout: 'layouts/public',
            feedData: JSON.stringify({ hostels, hotels, rentals })
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
    async getHostelRoom(id) {
        const room = await this.hostelsService['roomModel'].findById(id).populate('managerId').lean().exec();
        const hostel = room ? await this.hostelsService['hostelModel'].findById(room.hostelId).lean().exec() : null;
        const manager = room?.managerId || {};
        const payload = {
            room: room || {},
            hostel: hostel || {},
            managerProfile: {
                firstName: manager.firstName || 'Property',
                lastName: manager.lastName || 'Manager',
                role: manager.role || 'Hostel Manager',
                photo: manager.profilePhoto || '',
                phones: hostel?.phones?.length ? hostel.phones : (manager.phones || ['0700000000']),
                whatsapps: hostel?.whatsapps?.length ? hostel.whatsapps : (manager.whatsapps || ['0700000000'])
            }
        };
        return { title: `${room?.type || 'Room'} Details`, layout: 'layouts/public', payload: JSON.stringify(payload) };
    }
    async getHotelRoom(id) {
        const room = await this.hotelsService['roomModel'].findById(id).populate('managerId').lean().exec();
        const hotel = room ? await this.hotelsService['hotelModel'].findById(room.hotelId).lean().exec() : null;
        const manager = room?.managerId || {};
        const payload = {
            room: room || {},
            hotel: hotel || {},
            managerProfile: {
                firstName: manager.firstName || hotel?.name || 'Hotel',
                lastName: manager.lastName || 'Management',
                role: manager.role || 'Hotel Manager',
                photo: manager.profilePhoto || hotel?.profilePhoto || '',
                phones: hotel?.phones?.length ? hotel.phones : ['0700000000'],
                whatsapps: hotel?.whatsapps?.length ? hotel.whatsapps : ['0700000000']
            }
        };
        return { title: `${room?.type || 'Room'} Details`, layout: 'layouts/public', payload: JSON.stringify(payload) };
    }
    async getRentalItem(id) {
        const rental = await this.rentalsService['rentalModel'].findById(id).populate('managerId').lean().exec();
        const manager = rental?.managerId || {};
        const payload = {
            rental: rental || {},
            managerProfile: {
                firstName: manager.firstName || 'Property',
                lastName: manager.lastName || 'Broker',
                role: manager.role || 'Broker / Owner',
                photo: manager.profilePhoto || '',
                phones: manager.phones?.length ? manager.phones : ['0700000000'],
                whatsapps: manager.whatsapps?.length ? manager.whatsapps : ['0700000000'],
                activeListings: 1
            }
        };
        return { title: `${rental?.category || 'Property'} Details`, layout: 'layouts/public', payload: JSON.stringify(payload) };
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
    __metadata("design:returntype", Promise)
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
    __metadata("design:returntype", Promise)
], AppController.prototype, "getHostelRoom", null);
__decorate([
    (0, common_1.Get)('public/hotels/room/:id'),
    (0, common_1.Render)('hotel-details'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "getHotelRoom", null);
__decorate([
    (0, common_1.Get)('public/rentals/item/:id'),
    (0, common_1.Render)('rental-details'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
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
    __metadata("design:paramtypes", [app_service_1.AppService,
        hostels_service_1.HostelsService,
        hotels_service_1.HotelsService,
        rentals_service_1.RentalsService])
], AppController);
//# sourceMappingURL=app.controller.js.map