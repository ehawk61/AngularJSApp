import { Module } from '@nestjs/common'
import { CountryModule } from './country/country.module'
import { MongooseModule } from '@nestjs/mongoose'

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost:27017x/countries'),
  CountryModule]
})
export class AppModule {}
