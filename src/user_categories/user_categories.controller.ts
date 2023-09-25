import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { UserCategoriesService } from './user_categories.service';
import { CreateUserCategoryDto } from './dto/create-user_category.dto';
import { UpdateUserCategoryDto } from './dto/update-user_category.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

@Controller('user-categories')
export class UserCategoriesController {
  constructor(private readonly userCategoriesService: UserCategoriesService) {}

  @Post()
  create(@Body() createUserCategoryDto: CreateUserCategoryDto) {
    return this.userCategoriesService.create(createUserCategoryDto);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.userCategoriesService.findAll(paginationDto);
  }

  @Get(':term')
  findOne(@Param('term') term: string) {
    return this.userCategoriesService.findOne(term);
  }

  @Patch(':id')
  update(
    @Param('id') id: string, 
    @Body() updateUserCategoryDto: UpdateUserCategoryDto
    ) {
    return this.userCategoriesService.update(id, updateUserCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userCategoriesService.remove(id);
  }
}
