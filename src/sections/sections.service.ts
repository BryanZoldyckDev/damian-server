import { Injectable } from '@nestjs/common';
import { CreateSectionDto } from './dto/create-section.dto';
import { UpdateSectionDto } from './dto/update-section.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Section } from './entities/section.entity';
import { Repository } from 'typeorm';
import { DatabaseCommon } from 'src/common/validators/database.common';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { isUUID } from 'class-validator';
import { ErrorHandlerCommon } from 'src/common/errors/errorhandler.common';

@Injectable()
export class SectionsService {

  constructor(
    @InjectRepository(Section)
    private readonly sectionRepository: Repository<Section>
    ){}

  async create(createSectionDto: CreateSectionDto) {
    try {
      const section = this.sectionRepository.create(createSectionDto);
      await this.sectionRepository.save(section);

      return section;

    } catch (error) {
      DatabaseCommon.handleDBExceptions(error);
    }
  }

  findAll(paginationDto: PaginationDto) {
    const {limit = 10, offset = 0} = paginationDto;
  
    return this.sectionRepository.find({
      take: limit,
      skip: offset,
    })
  }

  async findOne(term: string) {
    let section: Section;

    if(isUUID(term)){
      section = await this.sectionRepository.findOneBy({section_id: term})
    } else {
      const queryBuilder = this.sectionRepository.createQueryBuilder();
      section = await queryBuilder
      .where(`section = :section`, {
        section: term
      }).getOne()
    }

    if(!section) ErrorHandlerCommon.notFoundHandler('Section', term);

    return section;
  }

  async update(id: string, updateSectionDto: UpdateSectionDto) {
    const section = await this.sectionRepository.preload({
      section_id: id,
      ...updateSectionDto
    })

    if(!this.sectionRepository) ErrorHandlerCommon.notFoundHandler('Section', id)
  
    try {
      await this.sectionRepository.save(section);

      return section;
    } catch (error) {
      DatabaseCommon.handleDBExceptions(error)
    }
  }

  async remove(id: string) {
    const section = await this.findOne(id);

    await this.sectionRepository.remove(section);

    return `The section with ID ${id} was removed`;
  }
}
