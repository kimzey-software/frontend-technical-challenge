export interface Place {
    "place name": string;
    longitude: string;
    latitude: string;
    state: string;
    "state abbreviation": string;
}

export interface ZipCodeApiResponse {
    country: string;
    "country abbreviation": string;
    "post code": string;
    places: Place[];
}

export interface ZipCode {
    zipCode: string;
    city: string;
    state: string;
    country: string;
    latitude: number;
    longitude: number;
}