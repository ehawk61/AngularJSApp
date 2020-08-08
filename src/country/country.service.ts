import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Country } from './model/Country';
import { CountryDTO } from './model/CountryDTO';

@Injectable()
export class CountryService{

  constructor(@InjectModel(Country.name) private readonly countryModel: Model<Country>) {}

  async findAll(): Promise<Country[]> {
    return this.countryModel.find().exec();
  }

  async findOne(countryName: string): Promise<Country> {
      return await this.countryModel.findOne({ 'countryName' : countryName }).exec();
  }

  async createCountry(country: CountryDTO):Promise<Country>{
    const countryAlreadyExists = await this.countryModel.findOne({'countryName' : country.countryName}).exec(); 
    if(countryAlreadyExists){
      throw new HttpException(`${country.countryName} already exists`, HttpStatus.CONFLICT)
    } else {
      const createdCountry = new this.countryModel(country)
      return createdCountry.save();
    }
     
  }
}   