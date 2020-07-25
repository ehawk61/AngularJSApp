import { Injectable } from '@nestjs/common'; 
import * as countryData from './countries.json';
import * as mongoose from 'mongoose'; 
import { getModelForClass } from '@typegoose/typegoose'; 
import { Country } from './model/Country'

@Injectable()
export class AppService {
  
  getData(): string {
    var mongoDBUrl = process.env.MONGO_URL || "localhost"
    var mongoDBPort = process.env.MONGO_PORT || 27017
    var mongoDBName = process.env.MONGO_DB_NAME || "countries"
    var countries = ''
    
    const countryModel = getModelForClass(Country)
    mongoose.connect(`mongodb://${mongoDBUrl}:${mongoDBPort}/${mongoDBName}`, {useNewUrlParser: true, useUnifiedTopology: true});
    
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

  async getCountry(country :string): Promise<Country> {
    var mongoDBUrl = process.env.MONGO_URL || "localhost"
    var mongoDBPort = process.env.MONGO_PORT || 27017
    var mongoDBName = process.env.MONGO_DB_NAME || "countries"
    
    const countryModel = getModelForClass(Country)
    mongoose.connect(`mongodb://${mongoDBUrl}:${mongoDBPort}/${mongoDBName}`, {useNewUrlParser: true, useUnifiedTopology: true});
    return await countryModel.findOneByCountryName(country); 
  }

  async getAllCountries(): Promise<Country[]>{
    var mongoDBUrl = process.env.MONGO_URL || "localhost"
    var mongoDBPort = process.env.MONGO_PORT || 27017
    var mongoDBName = process.env.MONGO_DB_NAME || "countries"
    
    const countryModel = getModelForClass(Country)
    mongoose.connect(`mongodb://${mongoDBUrl}:${mongoDBPort}/${mongoDBName}`, {useNewUrlParser: true, useUnifiedTopology: true})
    
    return await countryModel.find({}); 
  }

  async savingDataToDB(countryToBeAdded, countryModel){
     const exstingCountry = await countryModel.findByCountryName(countryToBeAdded.countryName)
     if(exstingCountry === undefined){ await countryToBeAdded.save() }
     else{ console.log(`${countryToBeAdded.countryName} Already Exists`) }
  }
  
}
