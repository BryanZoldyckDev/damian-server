import { Module } from '@nestjs/common';
import { UserCategoriesService } from './user_categories.service';
import { UserCategoriesController } from './user_categories.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserCategory } from './entities/user_category.entity';

@Module({
  controllers: [UserCategoriesController],
  providers: [UserCategoriesService],
  imports: [
    TypeOrmModule.forFeature([UserCategory])
  ]
})
export class UserCategoriesModule {}
