import { Module } from '@nestjs/common';
import { SectionsService } from './sections.service';
import { SectionsController } from './sections.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Section } from './entities/section.entity';

@Module({
  controllers: [SectionsController],
  providers: [SectionsService],
  imports: [
    TypeOrmModule.forFeature([Section])
  ]
})
export class SectionsModule {}
