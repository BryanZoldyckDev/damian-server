import { PartialType } from '@nestjs/mapped-types';
import { CreateUserCategoryDto } from './create-user_category.dto';

export class UpdateUserCategoryDto extends PartialType(CreateUserCategoryDto) {}
