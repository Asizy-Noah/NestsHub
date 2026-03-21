import mongoose, { Document } from 'mongoose';
export declare class RentalProperty extends Document {
    managerId: mongoose.Schema.Types.ObjectId;
    category: string;
    floorLevel: number;
    totalUnits: number;
    availableUnits: number;
    price: number;
    rateType: string;
    isSelfContained: boolean;
    accessiblePWD: boolean;
    hasVeranda: boolean;
    hasBalcony: boolean;
    hasAC: boolean;
    hotWater: boolean;
    paidWater: boolean;
    paidElectricity: boolean;
    paidInternet: boolean;
    isFurnished: boolean;
    furnishing: string[];
    cookingMethods: string[];
    unitPhotos: string[];
    propertyType: string;
    fenced: boolean;
    parking: boolean;
    backyard: boolean;
    largeCompound: boolean;
    greenery: boolean;
    cctvs: boolean;
    security: boolean;
    tarmackedAccess: boolean;
    propertyPhotos: string[];
    nearbyPharmacy: boolean;
    nearbyGym: boolean;
    nearbyGrocery: boolean;
    nearbyBodaboda: boolean;
    hospitalName: string;
    marketName: string;
    restaurantLevels: string[];
    district: string;
    division: string;
    nearestTown: string;
    distanceToTown: number;
    popularAreaName: string;
    streetName: string;
    distanceToTarmac: number;
}
export declare const RentalPropertySchema: mongoose.Schema<RentalProperty, mongoose.Model<RentalProperty, any, any, any, mongoose.Document<unknown, any, RentalProperty, any, {}> & RentalProperty & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, RentalProperty, mongoose.Document<unknown, {}, mongoose.FlatRecord<RentalProperty>, {}, mongoose.DefaultSchemaOptions> & mongoose.FlatRecord<RentalProperty> & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}>;
//# sourceMappingURL=rental-property.schema.d.ts.map