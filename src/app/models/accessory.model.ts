import { OfferTag } from "./car.model";

export interface Accessory{
    _id: any, // Keep this as 'any' because it will be converted into ObjectId() - which returns error from the database if this is not of type 'any'
    brand?: string,
    name: string,
    category: string,
    subCategory?: string,
    price: number,
    size: string,
    modelNumber: string,
    stockQty: number,
    dateCreated: Date,
    imageUrl?: string,
    visible: boolean,
    rating?: number,
    ratingUserCount?: number,
    offerTags?: [OfferTag],
    features?: string,
}