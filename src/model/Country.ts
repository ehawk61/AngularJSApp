import {prop, ReturnModelType } from '@typegoose/typegoose'

export class Country {
    @prop()
    countryName?: string 
  
    @prop()
    countryCode?: string
  
    @prop()
    continent?: string 
  
    @prop()
    currency?: string 
  
    @prop()
    wikimedia?: string
  
    public static async findByCountryName(this: ReturnModelType<typeof Country>, countryName: string){
      return this.find({ countryName }).exec();
    }
  
    public static async findOneByCountryName(this: ReturnModelType<typeof Country>, countryName: string){
      return this.findOne({ countryName }).exec(); 
    }
  }