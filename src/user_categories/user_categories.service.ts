import { Injectable } from '@nestjs/common';
import { CreateUserCategoryDto } from './dto/create-user_category.dto';
import { UpdateUserCategoryDto } from './dto/update-user_category.dto';

@Injectable()
export class UserCategoriesService {
  create(createUserCategoryDto: CreateUserCategoryDto) {
    return 'This action adds a new userCategory';
  }

  findAll() {
    return `This action returns all userCategories`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userCategory`;
  }

  update(id: number, updateUserCategoryDto: UpdateUserCategoryDto) {
    return `This action updates a #${id} userCategory`;
  }

  remove(id: number) {
    return `This action removes a #${id} userCategory`;
  }
}
