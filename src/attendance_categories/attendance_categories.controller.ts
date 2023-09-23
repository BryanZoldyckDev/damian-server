import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AttendanceCategoriesService } from './attendance_categories.service';
import { CreateAttendanceCategoryDto } from './dto/create-attendance_category.dto';
import { UpdateAttendanceCategoryDto } from './dto/update-attendance_category.dto';

@Controller('attendance-categories')
export class AttendanceCategoriesController {
  constructor(private readonly attendanceCategoriesService: AttendanceCategoriesService) {}

  @Post()
  create(@Body() createAttendanceCategoryDto: CreateAttendanceCategoryDto) {
    return this.attendanceCategoriesService.create(createAttendanceCategoryDto);
  }

  @Get()
  findAll() {
    return this.attendanceCategoriesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.attendanceCategoriesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAttendanceCategoryDto: UpdateAttendanceCategoryDto) {
    return this.attendanceCategoriesService.update(+id, updateAttendanceCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.attendanceCategoriesService.remove(+id);
  }
}
