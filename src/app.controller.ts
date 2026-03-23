import { Controller, Get, Render, Query, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // ==========================================
  // 1. CORE DISCOVERY PAGES
  // ==========================================
  
  @Get()
  @Render('index')
  getHomePage() {
    return { 
      title: 'NestHub Uganda | Find Your Perfect Space', 
      layout: 'layouts/public' 
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
  getHostelRoom(@Param('id') id: string) {
    // In the future: const roomData = await this.hostelsService.getRoomDetails(id);
    return { title: 'Hostel Room Details', layout: 'layouts/public', roomId: id };
  }

  @Get('public/hotels/room/:id')
  @Render('hotel-details')
  getHotelRoom(@Param('id') id: string) {
    return { title: 'Hotel Room Details', layout: 'layouts/public', roomId: id };
  }

  @Get('public/rentals/item/:id')
  @Render('rental-details')
  getRentalItem(@Param('id') id: string) {
    return { title: 'Rental Property Details', layout: 'layouts/public', itemId: id };
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
