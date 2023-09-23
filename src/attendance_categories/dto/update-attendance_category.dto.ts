import { PartialType } from '@nestjs/mapped-types';
import { CreateAttendanceCategoryDto } from './create-attendance_category.dto';

export class UpdateAttendanceCategoryDto extends PartialType(CreateAttendanceCategoryDto) {}
