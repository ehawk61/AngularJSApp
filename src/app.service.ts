import { Injectable } from '@nestjs/common'; 
import * as countryData from './countries.json';

@Injectable()
export class AppService {
  
  
  getHello(): string {
    return 'Hello World!';
  }

  getData(): string {
    var mongoDBUrl = process.env.MONGO_URL || "localhost"
    var mongoDBPort = process.env.MONGO_PORT || 27017
    var mongoDBName = process.env.MONGO_DB_NAME || "countries"
    var countries = ''
    countryData.forEach(country => {
        countries += country.countryName + " "
    });
    return 'Testing out Nest Data ' + countries;
  }
}
