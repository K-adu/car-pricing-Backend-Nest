import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
})
export class Report {
  @Prop()
  price: number;
}

export const ReportSchema = SchemaFactory.createForClass(Report);
