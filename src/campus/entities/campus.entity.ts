import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Campus {
    @PrimaryGeneratedColumn('uuid')
    campus_id: string;

    @Column('text', {
        unique: true,
    })
    campus_code: string;

    @Column('text')
    campus_name: string;

    @Column('text')
    campus_location: string;

    @Column('text', {
        array: true,
        default: []
    })
    attention_day: string[];
}
