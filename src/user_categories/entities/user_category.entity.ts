import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class UserCategory {
    @PrimaryGeneratedColumn('uuid')
    user_category_id: string

    @Column('text', {
        unique: true
    })
    user_category: string
}
