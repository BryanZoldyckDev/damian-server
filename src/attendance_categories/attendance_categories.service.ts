import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateAttendanceCategoryDto } from './dto/create-attendance_category.dto';
import { UpdateAttendanceCategoryDto } from './dto/update-attendance_category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';


import { AttendanceCategory } from './entities/attendance_category.entity';
import { DatabaseCommon } from '../common/validators/database.common';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

import { validate as isUUID } from 'uuid'
import { ErrorHandlerCommon } from 'src/common/errors/errorhandler.common';


@Injectable()
export class AttendanceCategoriesService {

  constructor(
    @InjectRepository(AttendanceCategory)
    private readonly attendanceCategoryRepository: Repository<AttendanceCategory>,
  ){}

  async create(createAttendanceCategoryDto: CreateAttendanceCategoryDto) {
    try {
      const attendanceCategory = this.attendanceCategoryRepository.create(createAttendanceCategoryDto);
      await this.attendanceCategoryRepository.save(attendanceCategory);

      return attendanceCategory;

    } catch (error) {
      DatabaseCommon.handleDBExceptions(error);
    }
  }

  findAll( paginationDto: PaginationDto) {

    const {limit = 10, offset = 0} = paginationDto

    return this.attendanceCategoryRepository.find({
      take: limit,
      skip: offset,
      //TODO: relaciones
    });
  }

  async findOne(term: string) {

    let attendanceCategory: AttendanceCategory;

    if ( isUUID(term) ){
      attendanceCategory = await this.attendanceCategoryRepository.findOneBy({ attendance_category_id: term })
    } /* else {
      attendanceCategory = await this.attendanceCategoryRepository.findOneBy({ attendance_category_slug: term })
    } */
      /* else {
        const queryBuilder = this.attendanceCategoryRepository.createQueryBuilder();
        attendanceCategory = await queryBuilder
          .where(`UPPER(title) =:title or slug =:slug`, {
            title: term.toUpperCase(),
            slug: term.toLowerCase(),
          }).getOne();
      }*/

    //const attendanceCategory = await this.attendanceCategoryRepository.findOneBy({ attendance_category_id: term });
    if (!attendanceCategory )
      ErrorHandlerCommon.notFoundHandler('Attendance category', term);

    return attendanceCategory;
  }

  async update(id: string, updateAttendanceCategoryDto: UpdateAttendanceCategoryDto) {
    
    const attendanceCategory = await this.attendanceCategoryRepository.preload({
      attendance_category_id: id,
      ...updateAttendanceCategoryDto
    });

    if ( !attendanceCategory ) ErrorHandlerCommon.notFoundHandler('Attendance category', id)

    try {

      await this.attendanceCategoryRepository.save( attendanceCategory );
      
      return attendanceCategory;

    } catch (error) {
      DatabaseCommon.handleDBExceptions(error);
    }
  }

  async remove(id: string) {

    const attendaceCategory = await this.findOne(id);

    await this.attendanceCategoryRepository.remove(attendaceCategory);

    return `The attendance category with ID ${id} was removed`;
  }

}
