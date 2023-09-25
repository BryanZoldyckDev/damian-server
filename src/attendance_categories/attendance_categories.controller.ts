import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, Query } from '@nestjs/common';
import { AttendanceCategoriesService } from './attendance_categories.service';
import { CreateAttendanceCategoryDto } from './dto/create-attendance_category.dto';
import { UpdateAttendanceCategoryDto } from './dto/update-attendance_category.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

@Controller('attendance-categories')
export class AttendanceCategoriesController {
  constructor(private readonly attendanceCategoriesService: AttendanceCategoriesService) {}

  @Post()
  create(@Body() createAttendanceCategoryDto: CreateAttendanceCategoryDto) {
    return this.attendanceCategoriesService.create(createAttendanceCategoryDto);
  }

  @Get()
  findAll( @Query() paginationDto: PaginationDto ) {
    return this.attendanceCategoriesService.findAll(paginationDto);
  }

  @Get(':term')
  findOne(@Param('term') term: string) {
    return this.attendanceCategoriesService.findOne(term);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string, 
    @Body() updateAttendanceCategoryDto: UpdateAttendanceCategoryDto
    ) {
    return this.attendanceCategoriesService.update(id, updateAttendanceCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.attendanceCategoriesService.remove(id);
  }
}
