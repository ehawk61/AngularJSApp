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

  async createCountry(country: CountryDTO):Promise<Country> {
    const countryAlreadyExists = await this.countryModel.findOne({'countryName' : country.countryName}).exec(); 
    if(countryAlreadyExists){
      throw new HttpException(`${country.countryName} already exists`, HttpStatus.CONFLICT)
    } else {
      const createdCountry = new this.countryModel(country)
      return createdCountry.save();
    }     
  }

  async deleteCountry(countryName:string): Promise<Country> {
    const countryToDelete = await this.countryModel.findOne({'countryName' : countryName}).exec(); 
    if(countryToDelete){
      return await this.countryModel.findOneAndDelete({'countryName' : countryToDelete.countryName}); 
    }
    else{
      throw new HttpException(`${countryName} does not exist`, HttpStatus.NOT_FOUND)
    }
  }

  async updateCountry(country: CountryDTO): Promise<Country> {
    let query = {'countryName' : country.countryName}
    return await this.countryModel.findOneAndUpdate(query, country)
  }
}   