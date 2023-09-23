import { Module } from '@nestjs/common';
import { AttendanceCategoriesService } from './attendance_categories.service';
import { AttendanceCategoriesController } from './attendance_categories.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AttendanceCategory } from './entities/attendance_category.entity';

@Module({
  controllers: [AttendanceCategoriesController],
  providers: [AttendanceCategoriesService],
  imports: [
    TypeOrmModule.forFeature([AttendanceCategory])
  ]
})
export class AttendanceCategoriesModule {}
