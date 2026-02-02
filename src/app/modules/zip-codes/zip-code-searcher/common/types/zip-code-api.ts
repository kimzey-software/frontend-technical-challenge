export interface ZipCodeApi {
  country: string;
  'country abbreviation': string;
  'post code': number;
  places: PlacesApi[];
}

export interface PlacesApi {
  'place name': string;
  longitude: string;
  latitude: number;
  state: string;
  'state abbreviation': string;
}
