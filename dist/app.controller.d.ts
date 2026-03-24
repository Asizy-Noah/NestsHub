import { AppService } from './app.service';
import { HostelsService } from './hostels/hostels.service';
import { HotelsService } from './hotels/hotels.service';
import { RentalsService } from './rentals/rentals.service';
export declare class AppController {
    private readonly appService;
    private readonly hostelsService;
    private readonly hotelsService;
    private readonly rentalsService;
    constructor(appService: AppService, hostelsService: HostelsService, hotelsService: HotelsService, rentalsService: RentalsService);
    getHomePage(): Promise<{
        title: string;
        layout: string;
        feedData: string;
    }>;
    getSearchResults(query: string, category: string): {
        title: string;
        layout: string;
        searchQuery: string;
        category: string;
    };
    getHostelRoom(id: string): Promise<{
        title: string;
        layout: string;
        payload: string;
    }>;
    getHotelRoom(id: string): Promise<{
        title: string;
        layout: string;
        payload: string;
    }>;
    getRentalItem(id: string): Promise<{
        title: string;
        layout: string;
        payload: string;
    }>;
    getHostelProfile(id: string): {
        title: string;
        layout: string;
        hostelId: string;
    };
    getHotelProfile(id: string): {
        title: string;
        layout: string;
        hotelId: string;
    };
    getBrokerProfile(id: string): {
        title: string;
        layout: string;
        brokerId: string;
    };
    getPublicReviews(targetId: string): {
        title: string;
        layout: string;
        targetId: string;
    };
    getAbout(): {
        title: string;
    };
}
//# sourceMappingURL=app.controller.d.ts.map