import { Module } from '@nestjs/common';
import { YearsService } from './years.service';
import { YearsController } from './years.controller';
import { Year } from './entities/year.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [YearsController],
  providers: [YearsService],
  imports: [
    TypeOrmModule.forFeature([Year]), 
  ]
})
export class YearsModule {}
