
import { Body, Controller, Get, Post, Param } from '@nestjs/common'
import { CountryService } from './country.service'
import { Country } from './model/Country'

@Controller('countries')
export class CountryController{
    constructor(private readonly countryService: CountryService) {}
    @Get()
    async findAll(): Promise<Country[]> {
        return this.countryService.findAll();
    }
    @Get(':countryName')
    async findOne(@Param() params): Promise<Country>{
        return this.countryService.findOne(params.countryName)
    }

}