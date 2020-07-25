import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { Country }  from './model/Country'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("/data")
  getData(): string {
    return this.appService.getData();
  }

  @Get("/countries/:countryName")
  getCountry(@Param() params): Promise<Country> {
    return this.appService.getCountry(params.countryName);
  }
  
  @Get("/countries")
  getCountries(): Promise<Country[]> {
    return this.appService.getAllCountries(); 
  }
}
