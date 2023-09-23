import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Year {
    @PrimaryGeneratedColumn('uuid')
    year_id: string

    @Column('integer', {
        unique: true
    })
    year: number
}
