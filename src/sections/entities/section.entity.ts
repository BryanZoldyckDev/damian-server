import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Section {

    @PrimaryGeneratedColumn('uuid')
    section_id: string;

    @Column('text', {
        unique: true,
    })
    section: string;
}
