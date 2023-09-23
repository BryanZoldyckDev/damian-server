import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class AttendanceCategory {
    @PrimaryGeneratedColumn('uuid')
    attendance_category_id: string

    @Column('text', {
        unique: true
    })
    attendance_category: string
}
