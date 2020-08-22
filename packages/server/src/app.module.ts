import { Module } from '@nestjs/common'
import { CountryModule } from './country/country.module'
import { MongooseModule } from '@nestjs/mongoose'

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost:27017/countries'),
  CountryModule]
})
export class AppModule {}
