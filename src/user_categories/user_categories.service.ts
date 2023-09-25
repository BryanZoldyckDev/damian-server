import { Injectable } from '@nestjs/common';
import { CreateUserCategoryDto } from './dto/create-user_category.dto';
import { UpdateUserCategoryDto } from './dto/update-user_category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserCategory } from './entities/user_category.entity';
import { Repository } from 'typeorm';
import { DatabaseCommon } from 'src/common/validators/database.common';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { isUUID } from 'class-validator';
import { ErrorHandlerCommon } from 'src/common/errors/errorhandler.common';

@Injectable()
export class UserCategoriesService {

  constructor(
    @InjectRepository(UserCategory)
    private readonly userCategoryRepository: Repository<UserCategory>
  ){}
  
  async create(createUserCategoryDto: CreateUserCategoryDto) {
    try {
      const userCategory = this.userCategoryRepository.create(createUserCategoryDto);
      await this.userCategoryRepository.save(userCategory);

      return userCategory;
    } catch (error) {
      DatabaseCommon.handleDBExceptions(error)
    }
  }

  findAll(paginationDto: PaginationDto) {
    const {limit = 10, offset = 0} = paginationDto;
  
    return this.userCategoryRepository.find({
      take: limit,
      skip: offset,
    })
  }

  async findOne(term: string) {
    let userCategory: UserCategory;

    if( isUUID(term) ){
      userCategory = await this.userCategoryRepository.findOneBy({user_category_id: term})
    } else {
      const queryBuilder = this.userCategoryRepository.createQueryBuilder();
      userCategory = await queryBuilder
        .where(`user_category = :user_category`, {
          user_category: term
        }).getOne()
    }

    if(!userCategory) ErrorHandlerCommon.notFoundHandler('User category', term);

    return userCategory;
  }

  async update(id: string, updateUserCategoryDto: UpdateUserCategoryDto) {
    const userCategory = await this.userCategoryRepository.preload({
      user_category_id: id,
      ...updateUserCategoryDto
    })

    if(!this.userCategoryRepository) ErrorHandlerCommon.notFoundHandler('User Category', id)
  
    try {
      await this.userCategoryRepository.save(userCategory);

      return userCategory;
    } catch (error) {
      DatabaseCommon.handleDBExceptions(error)
    }
  }

  async remove(id: string) {
    const userCategory = await this.findOne(id);

    await this.userCategoryRepository.remove(userCategory);

    return `The user category with ID ${id} was removed`
  }
}
