import { Controller, Get, Render, Query, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { HostelsService } from './hostels/hostels.service';
import { HotelsService } from './hotels/hotels.service';
import { RentalsService } from './rentals/rentals.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly hostelsService: HostelsService,
    private readonly hotelsService: HotelsService,
    private readonly rentalsService: RentalsService,
  ) {}

  // ==========================================
  // 1. CORE DISCOVERY PAGES
  // ==========================================
  
  @Get()
  @Render('index')
  async getHomePage() {
    // 1. Fetch Hostels Data
    const rawHostelRooms = await this.hostelsService['roomModel'].find({ availableRooms: { $gt: 0 } }).exec();
    const rawHostels = await this.hostelsService['hostelModel'].find().exec();
    
    const hostels = rawHostelRooms.map((room: any) => {
      const parent = rawHostels.find((h: any) => h._id && room.hostelId && h._id.toString() === room.hostelId.toString());
      
      // Build Hostel Amenities
      const amenities = [];
      if (room.isSelfContained) amenities.push({ icon: 'fa-bath', text: 'Self Contained' });
      if (parent?.amenities?.freeInternet) amenities.push({ icon: 'fa-wifi', text: 'Free WiFi' });
      if (parent?.amenities?.freeTransport) amenities.push({ icon: 'fa-van-shuttle', text: 'Transport' });
      if (room.hasAC) amenities.push({ icon: 'fa-snowflake', text: 'AC' });

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
        amenities: amenities.slice(0, 3) // Show max 3 on the card
      };
    });

    // 2. Fetch Hotels Data
    const rawHotelRooms = await this.hotelsService['roomModel'].find({ availableRooms: { $gt: 0 } }).exec();
    const rawHotels = await this.hotelsService['hotelModel'].find().exec();

    const hotels = rawHotelRooms.map((room: any) => {
      const parent = rawHotels.find((h: any) => h._id && room.hotelId && h._id.toString() === room.hotelId.toString());
      
      // Build Hotel Amenities
      const amenities = [];
      if (room.bedAndBreakfast) amenities.push({ icon: 'fa-mug-hot', text: 'Breakfast' });
      if (room.hasAC) amenities.push({ icon: 'fa-snowflake', text: 'AC' });
      if (room.hotWater) amenities.push({ icon: 'fa-shower', text: 'Hot Water' });
      if (parent?.amenities?.freeInternet) amenities.push({ icon: 'fa-wifi', text: 'Free WiFi' });

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
        amenities: amenities.slice(0, 3) // Show max 3 on the card
      };
    });

    // 3. Fetch Rentals Data
    const rawRentals = await this.rentalsService['rentalModel'].find({ availableUnits: { $gt: 0 } }).exec();
    const rentals = rawRentals.map((rental: any) => {
      
      // Build Rental Amenities
      const amenities = [];
      if (rental.isSelfContained) amenities.push({ icon: 'fa-bath', text: 'Self Contained' });
      if (rental.fenced) amenities.push({ icon: 'fa-shield-halved', text: 'Fenced' });
      if (rental.parking) amenities.push({ icon: 'fa-square-parking', text: 'Parking' });
      if (rental.hasAC) amenities.push({ icon: 'fa-snowflake', text: 'AC' });

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
        amenities: amenities.slice(0, 3) // Show max 3 on the card
      };
    });

    return { 
      title: 'NestHub Uganda | Find Your Perfect Space', 
      layout: 'layouts/public',
      feedData: JSON.stringify({ hostels, hotels, rentals })
    };
  }

  @Get('search')
  @Render('results')
  getSearchResults(@Query('q') query: string, @Query('category') category: string) {
    return { 
      title: `Search Results | NestHub`, 
      layout: 'layouts/public',
      searchQuery: query || '',
      category: category || 'all'
    };
  }

  // ==========================================
  // 2. INDIVIDUAL PROPERTY DETAILS (Rooms/Units)
  // ==========================================

  @Get('public/hostels/room/:id')
  @Render('hostel-details')
  async getHostelRoom(@Param('id') id: string) {
    const roomModel = this.hostelsService['roomModel'];
    const hostelModel = this.hostelsService['hostelModel'];

    const room: any = await roomModel.findById(id).lean().exec();
    const hostel: any = room ? await hostelModel.findById(room.hostelId).lean().exec() : null;
    
    // Fetch all hostels for quick mapping
    const allHostels = await hostelModel.find().lean().exec();

    // 1. Comparison Rooms (Same type, different hostel)
    const comparisonRoomsRaw = await roomModel
      .find({ type: room?.type, hostelId: { $ne: room?.hostelId }, availableRooms: { $gt: 0 } })
      .limit(5).lean().exec();

    const comparisonRooms = comparisonRoomsRaw.map((r: any) => {
      const h = allHostels.find((x: any) => x._id.toString() === r.hostelId?.toString());
      return { 
        id: r._id, type: r.type, price: r.price, period: r.pricingPeriod,
        hostelName: h?.name, location: h?.locationName,
        image: r.photos?.[0] || h?.gallery?.[0] || 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=400'
      };
    });

    // 2. Other Rooms (Different categories or general)
    const otherRoomsRaw = await roomModel
      .find({ _id: { $ne: id }, availableRooms: { $gt: 0 } })
      .limit(10).lean().exec();

    const otherRooms = otherRoomsRaw.map((r: any) => {
      const h = allHostels.find((x: any) => x._id.toString() === r.hostelId?.toString());
      const amenities = [];
      if (r.isSelfContained) amenities.push({ icon: 'fa-bath', text: 'Self Contained' });
      if (r.hasAC) amenities.push({ icon: 'fa-snowflake', text: 'AC' });
      
      return {
        id: r._id, url: `/public/hostels/room/${r._id}`, title: `${r.type} Room at ${h?.name || 'Hostel'}`,
        location: h?.locationName || '', price: r.price, period: r.pricingPeriod || 'Semester',
        image: r.photos?.[0] || h?.gallery?.[0] || 'https://images.unsplash.com/photo-1522771731470-ea43374b422a?w=400',
        badge: h?.isVerified ? 'Verified' : null, amenities
      };
    });

    const payload = {
      room: room || {},
      hostel: hostel || {},
      comparisonRooms,
      otherRooms
    };

    return { title: `${room?.type || 'Room'} Details`, layout: 'layouts/public', payload: JSON.stringify(payload) };
  }

  @Get('public/hotels/room/:id')
  @Render('hotel-details')
  async getHotelRoom(@Param('id') id: string) {
    const roomModel = this.hotelsService['roomModel'];
    const hotelModel = this.hotelsService['hotelModel'];

    const room: any = await roomModel.findById(id).lean().exec();
    const hotel: any = room ? await hotelModel.findById(room.hotelId).lean().exec() : null;
    
    // Fetch all hotels for quick mapping
    const allHotels = await hotelModel.find().lean().exec();

    // 1. Comparison Rooms (Same type, different hotel)
    const comparisonRoomsRaw = await roomModel
      .find({ type: room?.type, hotelId: { $ne: room?.hotelId }, availableRooms: { $gt: 0 } })
      .limit(5).lean().exec();

    const comparisonRooms = comparisonRoomsRaw.map((r: any) => {
      const h = allHotels.find((x: any) => x._id.toString() === r.hotelId?.toString());
      return { 
        id: r._id, type: r.type, price: r.price, period: r.pricingPeriod || 'Night',
        hotelName: h?.name || 'Hotel', location: h?.districtOrCity || '',
        image: r.photos?.[0] || h?.gallery?.[0] || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400'
      };
    });

    // 2. Other Rooms (Different categories or general)
    const otherRoomsRaw = await roomModel
      .find({ _id: { $ne: id }, availableRooms: { $gt: 0 } })
      .limit(10).lean().exec();

    const otherRooms = otherRoomsRaw.map((r: any) => {
      const h = allHotels.find((x: any) => x._id.toString() === r.hotelId?.toString());
      const amenities = [];
      if (r.bedAndBreakfast) amenities.push({ icon: 'fa-mug-hot', text: 'Breakfast' });
      if (r.hasAC) amenities.push({ icon: 'fa-snowflake', text: 'AC' });
      if (r.hotWater) amenities.push({ icon: 'fa-shower', text: 'Hot Water' });
      
      return {
        id: r._id, url: `/public/hotels/room/${r._id}`, title: `${r.type} at ${h?.name || 'Hotel'}`,
        location: h?.districtOrCity || '', price: r.price, period: r.pricingPeriod || 'Night',
        image: r.photos?.[0] || h?.gallery?.[0] || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400',
        badge: h?.isVerified ? 'Verified' : null, amenities
      };
    });

    const payload = {
      room: room || {},
      hotel: hotel || {},
      comparisonRooms,
      otherRooms
    };

    return { title: `${room?.type || 'Room'} Details`, layout: 'layouts/public', payload: JSON.stringify(payload) };
  }

  @Get('public/rentals/item/:id')
  @Render('rental-details')
  async getRentalItem(@Param('id') id: string) {
    const rentalModel = this.rentalsService['rentalModel'];
    
    // Fetch the specific rental and populate its manager
    const rental: any = await rentalModel.findById(id).populate('managerId').lean().exec();
    const manager = rental?.managerId || {};

    // 1. Comparison Rentals (Broader Search: Matches Category OR Property Type)
    const comparisonRaw = await rentalModel
      .find({ 
        $or: [
          { category: rental?.category }, 
          { propertyType: rental?.propertyType }
        ],
        _id: { $ne: rental?._id }, 
        availableUnits: { $gt: 0 } 
      })
      .limit(5).lean().exec();

    const comparisonRentals = comparisonRaw.map((r: any) => {
      // Build dynamic amenities array for comparison cards
      const amenities = [];
      if (r.isSelfContained) amenities.push({ icon: 'fa-bath', text: 'Self Contained' });
      if (r.fenced) amenities.push({ icon: 'fa-shield-halved', text: 'Fenced' });
      if (r.parking) amenities.push({ icon: 'fa-square-parking', text: 'Parking' });
      if (r.hasAC) amenities.push({ icon: 'fa-snowflake', text: 'AC' });

      return {
        id: r._id, url: `/public/rentals/item/${r._id}`, title: `${r.category} in ${r.propertyType}`,
        location: r.nearestTown || r.district || '', price: r.price, period: r.rateType || 'Month',
        image: r.unitPhotos?.[0] || r.propertyPhotos?.[0] || 'https://images.unsplash.com/photo-1502672260266-1c1e541818bd?w=400',
        badge: 'Compare', amenities: amenities.slice(0, 2) // Limit to 2 for smaller cards
      };
    });

    // 2. Other Rentals
    const otherRaw = await rentalModel
      .find({ _id: { $ne: id }, availableUnits: { $gt: 0 } })
      .limit(10).lean().exec();

    const otherRentals = otherRaw.map((r: any) => {
      const amenities = [];
      if (r.isSelfContained) amenities.push({ icon: 'fa-bath', text: 'Self Contained' });
      if (r.fenced) amenities.push({ icon: 'fa-shield-halved', text: 'Fenced' });
      if (r.parking) amenities.push({ icon: 'fa-square-parking', text: 'Parking' });
      if (r.hasAC) amenities.push({ icon: 'fa-snowflake', text: 'AC' });

      return {
        id: r._id, url: `/public/rentals/item/${r._id}`, title: `${r.category} in ${r.propertyType}`,
        location: r.nearestTown || r.district || '', price: r.price, period: r.rateType || 'Month',
        image: r.unitPhotos?.[0] || r.propertyPhotos?.[0] || 'https://images.unsplash.com/photo-1502672260266-1c1e541818bd?w=400',
        badge: 'Available', amenities: amenities.slice(0, 3)
      };
    });

    const payload = {
      rental: rental || {},
      managerProfile: {
        _id: manager._id || '',
        firstName: manager.firstName || 'Property',
        lastName: manager.lastName || 'Broker',
        role: manager.role || 'Broker / Owner',
        photo: manager.profilePhoto || '',
        phones: manager.phones?.length ? manager.phones : ['0700000000'],
        whatsapps: manager.whatsapps?.length ? manager.whatsapps : ['0700000000']
      },
      comparisonRentals,
      otherRentals
    };

    return { title: `${rental?.category || 'Property'} Details`, layout: 'layouts/public', payload: JSON.stringify(payload) };
  }

  // ==========================================
  // 3. PROPERTY & MANAGER PUBLIC PROFILES
  // ==========================================

  @Get('public/hostels/:id')
  @Render('hostel')
  getHostelProfile(@Param('id') id: string) {
    return { title: 'Hostel Profile', layout: 'layouts/public', hostelId: id };
  }

  @Get('public/hotels/:id')
  @Render('hotel')
  getHotelProfile(@Param('id') id: string) {
    return { title: 'Hotel Profile', layout: 'layouts/public', hotelId: id };
  }

  @Get('public/brokers/:id')
  @Render('rental') // Uses the broker/rental profile EJS
  getBrokerProfile(@Param('id') id: string) {
    return { title: 'Broker Profile', layout: 'layouts/public', brokerId: id };
  }

  // ==========================================
  // 4. PUBLIC REVIEWS PAGE
  // ==========================================

  @Get('public/reviews/:targetId')
  @Render('reviews')
  getPublicReviews(@Param('targetId') targetId: string) {
    return { title: 'Public Reviews', layout: 'layouts/public', targetId };
  }

  @Get('about')
  @Render('about')
  getAbout() {
    return { title: 'About Us' };
  }
}
