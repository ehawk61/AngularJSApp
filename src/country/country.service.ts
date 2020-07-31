import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Country } from './model/Country';

@Injectable()
export class CountryService{
    constructor(@InjectModel(Country.name) private readonly countryModel: Model<Country>) {}

  
  async findAll(): Promise<Country[]> {
    return this.countryModel.find().exec();
  }
  async findOne(countryName: string): Promise<Country> {
      return await this.countryModel.findOne({ 'countryName' : countryName }).exec();
  }
}   