import { Injectable } from '@nestjs/common';
import { CreateModuleDto } from './dto/create-module.dto';
import { UpdateModuleDto } from './dto/update-module.dto';
import { InjectRepository } from '@nestjs/typeorm';

import {Module as ModuleE} from './entities/module.entity'
import { Repository } from 'typeorm';
import { DatabaseCommon } from 'src/common/validators/database.common';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { isUUID } from 'class-validator';
import { ErrorHandlerCommon } from 'src/common/errors/errorhandler.common';

@Injectable()
export class ModulesService {

  constructor(
    @InjectRepository(ModuleE)
    private readonly moduleRepository: Repository<ModuleE>
  ){}

  async create(createModuleDto: CreateModuleDto) {
    try {
      const module = this.moduleRepository.create(createModuleDto);
      await this.moduleRepository.save(module);

      return module;

    } catch (error) {
      DatabaseCommon.handleDBExceptions(error);
    }
  }

  findAll( paginationDto: PaginationDto ) {
    const {limit = 10, offset = 0} = paginationDto;
  
    return this.moduleRepository.find({
      take: limit,
      skip: offset,
    })
  }

  async findOne(term: string) {
    
    let module: ModuleE;

    if(isUUID(term)){
      module = await this.moduleRepository.findOneBy({module_id: term});
    } else {
      const queryBuilder = this.moduleRepository.createQueryBuilder();
      module = await queryBuilder
        .where(`module_year = :module_year or module = :module`, {
          module_year: term,
          module: term,
        }).getOne();
    }

    if(!module) ErrorHandlerCommon.notFoundHandler('Module', term);

    return module;
  }

  async update(id: string, updateModuleDto: UpdateModuleDto) {
    const module = await this.moduleRepository.preload({
      module_id: id,
      ...updateModuleDto
    })

    if (!this.moduleRepository) ErrorHandlerCommon.notFoundHandler('Module', id)

    try {
      await this.moduleRepository.save(module)

      return module;
    } catch (error) {
      DatabaseCommon.handleDBExceptions(error)
    }
  }

  async remove(id: string) {
    const module = await this.findOne(id);

    await this.moduleRepository.remove(module);

    return `The module with ID ${id} was removed`;
  }
}
