import * as yup from 'yup';

export const createZipCodeValidations = yup.object({
  zipCode: yup.number().required().label('Zip code'),
  city: yup.string().required().label('City'),
  state: yup.string().required().label('State'),
  latitude: yup.string().required().label('Latitude'),
  longitude: yup.string().required().label('Longitude'),
  observations: yup.string().required().label('Observations'),
  country: yup.string().required().label('Country'),
});
