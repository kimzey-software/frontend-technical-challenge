import type { ZipCodeDto } from './types/zip-code-dto.ts';
import type { ZipCodeApi } from './types/zip-code-api.ts';

export const mapperDto = <TResponse, TResult>(api: TResponse): TResult => ({
  country: api.country,
  countryAbbreviation: api['country abbreviation'],
  postCode: api['post code'],
  places: api.places.map(place => ({
    placeName: place['place name'],
    longitude: Number(place.longitude),
    latitude: Number(place.latitude),
    state: place.state,
    stateAbbreviation: place['state abbreviation'],
  })),
});
