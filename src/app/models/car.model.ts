
// LATER: Move it over to a different model or core interfaces - file
export interface OfferTag{
    name: string,
    color: string
}

export interface Car{
    _id: any,
    make: string,
    model: string,
    year: number,
    mileage: number,
    transmission: string,
    fuelEconomy: number,
    desc: string,
    price: number,
    bodyType: string,
    drivetrain: string,
    accidentHistory: {
        count: number,
        desc: string
    },
    rating: number,
    location: string,
    featureTags: [string],
    dateCreated: Date,
    imageUrl?: string,
    offerTags?: [OfferTag],
    visible: boolean
}