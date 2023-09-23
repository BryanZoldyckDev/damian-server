import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Campus {
    @PrimaryGeneratedColumn('uuid')
    campus_id: string;

    @Column('integer', {
        unique: true,
    })
    campus_code: number;

    @Column('text')
    campus_name: string;

    @Column('text')
    campus_location: string;

    @Column('text', {
        array: true
    })
    attention_day: string[];
}
