import { Injectable } from '@nestjs/common';
import { CreateAttendanceCategoryDto } from './dto/create-attendance_category.dto';
import { UpdateAttendanceCategoryDto } from './dto/update-attendance_category.dto';

@Injectable()
export class AttendanceCategoriesService {
  create(createAttendanceCategoryDto: CreateAttendanceCategoryDto) {
    return 'This action adds a new attendanceCategory';
  }

  findAll() {
    return `This action returns all attendanceCategories`;
  }

  findOne(id: number) {
    return `This action returns a #${id} attendanceCategory`;
  }

  update(id: number, updateAttendanceCategoryDto: UpdateAttendanceCategoryDto) {
    return `This action updates a #${id} attendanceCategory`;
  }

  remove(id: number) {
    return `This action removes a #${id} attendanceCategory`;
  }
}
