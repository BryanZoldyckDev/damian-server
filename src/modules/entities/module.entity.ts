import { MAX } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Module {
    @PrimaryGeneratedColumn('uuid')
    module_id: string

    @Column('integer')
    module_year: number
    
    @Column('integer')
    module: number
}
