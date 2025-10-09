import { Injectable } from '@nestjs/common';
import { Country, City } from 'country-state-city';
import { continents, countries, getCountryDataList, TContinentCode } from 'countries-list';

@Injectable()
export class LocationService {
  getContinents() {
    const continents: { code: TContinentCode, name: string }[] = [
      { code: 'AF', name: 'Africa' },
      { code: 'AN', name: 'Antarctica' },
      { code: 'AS', name: 'Asia' },
      { code: 'EU', name: 'Europe' },
      { code: 'NA', name: 'North America' },
      { code: 'OC', name: 'Oceania' },
      { code: 'SA', name: 'South America' },
    ];
    return continents;
  }

  getCountriesByContinent(continentCode: string) {
    const filteredCountries = getCountryDataList().filter(country =>
      country.continent === continentCode
    );

    return filteredCountries.map(country => ({
      code: country.iso2,
      name: country.name
    }));
  }

  getCitiesByCountry(countryCode: string) {
    const cities = City.getCitiesOfCountry(countryCode);
    return cities?.map(city => ({
      name: city.name,
      countryCode: city.countryCode,
    })) || [];
  }
}