import { Injectable } from '@nestjs/common';
import { CreateYearDto } from './dto/create-year.dto';
import { UpdateYearDto } from './dto/update-year.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Year } from './entities/year.entity';
import { Repository } from 'typeorm';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { DatabaseCommon } from 'src/common/validators/database.common';
import { isUUID } from 'class-validator';
import { ErrorHandlerCommon } from 'src/common/errors/errorhandler.common';

@Injectable()
export class YearsService {

  constructor(
    @InjectRepository(Year)
    private readonly yearRepository: Repository<Year>
  ){}

  async create(createYearDto: CreateYearDto) {
    try {
      const year = this.yearRepository.create(createYearDto);
      await this.yearRepository.save(year);

      return year;

    } catch (error) {
      DatabaseCommon.handleDBExceptions(error);
    }
  }

  findAll(paginationDto: PaginationDto) {
    const {limit = 10, offset = 0} = paginationDto;
  
    return this.yearRepository.find({
      take: limit,
      skip: offset,
    })
  }

  async findOne(term: string) {
    let year: Year;

    if(isUUID(term)){
      year = await this.yearRepository.findOneBy({year_id: term})
    } else {
      const queryBuilder = this.yearRepository.createQueryBuilder();
      year = await queryBuilder
      .where(`year = :year`, {
        year: term
      }).getOne()
    }

    if(!year) ErrorHandlerCommon.notFoundHandler('Year', term);

    return year;
  }

  async update(id: string, updateYearDto: UpdateYearDto) {
    const year = await this.yearRepository.preload({
      year_id: id,
      ...updateYearDto
    })

    if(!this.yearRepository) ErrorHandlerCommon.notFoundHandler('Year', id)
  
    try {
      await this.yearRepository.save(year);

      return year;
    } catch (error) {
      DatabaseCommon.handleDBExceptions(error)
    }
  }

  async remove(id: string) {
    const year = await this.findOne(id);

    await this.yearRepository.remove(year);

    return `The section with ID ${id} was removed`
  }
}
