import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SectionsModule } from './sections/sections.module';
import { YearsModule } from './years/years.module';
import { CampusModule } from './campus/campus.module';
import { ModulesModule } from './modules/modules.module';
import { AttendanceCategoriesModule } from './attendance_categories/attendance_categories.module';
import { UserCategoriesModule } from './user_categories/user_categories.module';
import { CommonModule } from './common/common.module';


@Module({
  imports: [
    ConfigModule.forRoot(),

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST, 
      port: +process.env.DB_PORT,
      database: process.env.DB_NAME,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      autoLoadEntities: true,
      synchronize: true,
    }),

    SectionsModule,

    YearsModule,

    CampusModule,

    ModulesModule,

    AttendanceCategoriesModule,

    UserCategoriesModule,

    CommonModule
   ],
})
export class AppModule {}
