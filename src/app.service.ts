import { Injectable } from '@nestjs/common'; 
import * as countryData from './countries.json';
import * as mongoose from 'mongoose'; 
import { prop, getModelForClass, ReturnModelType } from '@typegoose/typegoose'; 

class Country {
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
}

@Injectable()
export class AppService {
  
  
  getHello(): string {
    return 'Hello World!';
  }

  getData(): string {
    var mongoDBUrl = process.env.MONGO_URL || "localhost"
    var mongoDBPort = process.env.MONGO_PORT || 27017
    var mongoDBName = process.env.MONGO_DB_NAME || "countries"
    
    const countryModel = getModelForClass(Country)
    mongoose.connect(`mongodb://${mongoDBUrl}:${mongoDBPort}/${mongoDBName}`, {useNewUrlParser: true, useUnifiedTopology: true})
    var countries = '';
    
    (async () =>{
      
      countryData.forEach(country => {
        const countryToBeAdded = new countryModel({countryName : country.countryName, countryCode: country.countryCode, 
                                                      continent: country.continent, currency: country.currency, wikimedia: country.wikimedia})
      
        this.savingDataToDB(countryToBeAdded, countryModel)
        countries += country.countryName + " "
      }) 
    })()
   
    
    return 'Testing out Nest Data ' + countries;
  }

  async savingDataToDB(countryToBeAdded, countryModel){
     const exstingCountry = await countryModel.findByCountryName(countryToBeAdded.countryName)
     if(exstingCountry === undefined){ await countryToBeAdded.save() }
     else{ console.log(`${countryToBeAdded.countryName} Already Exists`) }
  }

  
}
