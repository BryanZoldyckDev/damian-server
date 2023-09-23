import { Module } from '@nestjs/common';
import { ModulesService } from './modules.service';
import { ModulesController } from './modules.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module as ModuleEntity } from './entities/module.entity'

@Module({
  controllers: [ModulesController],
  providers: [ModulesService],
  imports: [
    TypeOrmModule.forFeature([ModuleEntity])
  ]
})
export class ModulesModule {}
