import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserCategoriesService } from './user_categories.service';
import { CreateUserCategoryDto } from './dto/create-user_category.dto';
import { UpdateUserCategoryDto } from './dto/update-user_category.dto';

@Controller('user-categories')
export class UserCategoriesController {
  constructor(private readonly userCategoriesService: UserCategoriesService) {}

  @Post()
  create(@Body() createUserCategoryDto: CreateUserCategoryDto) {
    return this.userCategoriesService.create(createUserCategoryDto);
  }

  @Get()
  findAll() {
    return this.userCategoriesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userCategoriesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserCategoryDto: UpdateUserCategoryDto) {
    return this.userCategoriesService.update(+id, updateUserCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userCategoriesService.remove(+id);
  }
}
