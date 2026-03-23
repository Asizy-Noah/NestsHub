import { AppService } from './app.service';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getHomePage(): {
        title: string;
        layout: string;
    };
    getSearchResults(query: string, category: string): {
        title: string;
        layout: string;
        searchQuery: string;
        category: string;
    };
    getHostelRoom(id: string): {
        title: string;
        layout: string;
        roomId: string;
    };
    getHotelRoom(id: string): {
        title: string;
        layout: string;
        roomId: string;
    };
    getRentalItem(id: string): {
        title: string;
        layout: string;
        itemId: string;
    };
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