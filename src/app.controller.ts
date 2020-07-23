import { Controller, Get, Param } from '@nestjs/common';
import { AppService, Country } from './app.service';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
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
