
import { Body, Controller, Get, Post, Param, HttpException, HttpStatus, Res, NotFoundException } from '@nestjs/common'
import { CountryService } from './country.service'
import { Country } from './model/Country'

@Controller('countries')
export class CountryController{
    constructor(private readonly countryService: CountryService) {}
    @Get()
    async findAll(@Res() res): Promise<Country[]> {
        const countries = await this.countryService.findAll();
        if(!countries) throw new HttpException(`Countries not found`, HttpStatus.NOT_FOUND)
        return res.status(HttpStatus.OK).json(countries); 
    }
    @Get(':countryName')
    async findOne(@Res() res, @Param() params): Promise<Country>{
        
        const country = await this.countryService.findOne(params.countryName)
        if(!country) throw new HttpException(`${params.countryName} not found`, HttpStatus.NOT_FOUND)
        return res.status(HttpStatus.OK).json(country);
        
    }


}