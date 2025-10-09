import {
  Controller,
  Get,
  Param,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
} from '@nestjs/swagger';
import { LocationService } from './location.service';
import { ContinentResponseModel } from './model/continent-response.model';
import { CountryResponseModel } from './model/country-response.model';
import { CityResponseModel } from './model/city-response.model';
import { StateResponseModel } from './model/state-response.model';

@ApiTags('location')
@Controller({ path: 'location', version: '1' })
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @ApiOperation({ summary: 'Get all continents' })
  @ApiResponse({
    status: 200,
    description: 'List of continents retrieved successfully',
    type: [ContinentResponseModel]
  })
  @Get('continents')
  getContinents(): ContinentResponseModel[] {
    return this.locationService.getContinents();
  }

  @ApiOperation({ summary: 'Get countries by continent' })
  @ApiParam({ name: 'continentCode', description: 'Continent code (AF, AS, EU, NA, SA, OC, AN)', example: 'AS' })
  @ApiResponse({
    status: 200,
    description: 'Countries for the specified continent retrieved successfully',
    type: [CountryResponseModel]
  })
  @ApiResponse({ status: 400, description: 'Invalid continent code' })
  @Get('continents/:continentCode/countries')
  getCountriesByContinent(@Param('continentCode') continentCode: string): CountryResponseModel[] {
    const validContinents = ['AF', 'AS', 'EU', 'NA', 'SA', 'OC', 'AN'];
    if (!validContinents.includes(continentCode.toUpperCase())) {
      throw new HttpException('Invalid continent code', HttpStatus.BAD_REQUEST);
    }
    return this.locationService.getCountriesByContinent(continentCode.toUpperCase());
  }

  @ApiOperation({ summary: 'Get cities by country' })
  @ApiParam({ name: 'countryCode', description: 'Country ISO code', example: 'US' })
  @ApiResponse({
    status: 200,
    description: 'Cities for the specified country retrieved successfully',
    type: [CityResponseModel]
  })
  @ApiResponse({ status: 400, description: 'Invalid country code' })
  @Get('countries/:countryCode/cities')
  getCitiesByCountry(@Param('countryCode') countryCode: string): CityResponseModel[] {
    if (!countryCode || countryCode.length !== 2) {
      throw new HttpException('Invalid country code', HttpStatus.BAD_REQUEST);
    }
    return this.locationService.getCitiesByCountry(countryCode.toUpperCase());
  }
}