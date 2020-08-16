import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'; 
import { Document } from 'mongoose';

@Schema()
export class Country extends Document {
    @Prop()
    countryName?: string 
  
    @Prop()
    countryCode?: string
  
    @Prop()
    continent?: string 
  
    @Prop()
    currency?: string 
  
    @Prop()
    wikimedia?: string
  
  }

  export const CountrySchema = SchemaFactory.createForClass(Country); 