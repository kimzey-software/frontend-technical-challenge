export interface ZipCodeDto {
  country: string;
  countryAbbreviation: string;
  postCode: number;
  places: Places[];
}

export interface Places {
  placeName: string;
  longitude: string;
  latitude: number;
  state: string;
  stateAbbreviation: string;
}
