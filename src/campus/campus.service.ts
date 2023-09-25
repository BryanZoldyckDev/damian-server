import { Injectable } from '@nestjs/common';
import { CreateCampusDto } from './dto/create-campus.dto';
import { UpdateCampusDto } from './dto/update-campus.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';


//TODO: IMPROVE IMPORTATIONS
import { Campus } from './entities/campus.entity';
import { DatabaseCommon } from '../common/validators/database.common';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

import { validate as isUUID } from 'uuid'
import { ErrorHandlerCommon } from 'src/common/errors/errorhandler.common';

@Injectable()
export class CampusService {

  constructor(
    @InjectRepository(Campus)
    private readonly campusRepository: Repository<Campus>,
  ){}

  async create(createCampusDto: CreateCampusDto) {
    try {
      const campus = this.campusRepository.create(createCampusDto);
      await this.campusRepository.save(campus);

      return campus;

    } catch (error) {
      DatabaseCommon.handleDBExceptions(error);
    }
  }


  findAll( paginationDto: PaginationDto ) {
    const {limit = 10, offset = 0} = paginationDto;

    return this.campusRepository.find({
      take: limit,
      skip: offset,
      //TODO: relaciones
    })
  }

  async findOne(term: string) {
   
    let campus: Campus;

    if(isUUID(term)){
      campus = await this.campusRepository.findOneBy({campus_id: term})
    } else {
      const queryBuilder = this.campusRepository.createQueryBuilder();
      campus = await queryBuilder
        .where(`campus_code = :campus_code or LOWER(campus_name) LiKE :campus_name or UPPER(campus_location) LIKE :campus_location or :attention_day = ANY(attention_day)`, {
          campus_code: term,
          campus_name: `%${term.toLowerCase()}%`,
          campus_location: `%${term.toUpperCase()}%`,
          attention_day: term.toLowerCase(),
        }).getOne();
      }
      
      if (!campus)
        ErrorHandlerCommon.notFoundHandler('Campus', term);

      return campus;
  }

  async update(id: string, updateCampusDto: UpdateCampusDto) {
    
    const campus = await this.campusRepository.preload({
      campus_id: id,
      ...updateCampusDto
    })

    if (!this.campusRepository) ErrorHandlerCommon.notFoundHandler('Campus', id)

    try {
      
      await this.campusRepository.save(campus)

      return campus;

    } catch (error) {
      DatabaseCommon.handleDBExceptions(error)
    }

  }

  async remove(id: string) {

    const campus = await this.findOne(id);

    await this.campusRepository.remove(campus);

    return `The campus with ID ${id} was removed`;
  }
}
