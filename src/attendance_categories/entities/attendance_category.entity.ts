import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class AttendanceCategory {
    @PrimaryGeneratedColumn('uuid')
    attendance_category_id: string

    @Column('text', {
        unique: true
    })
    attendance_category: string

    // @Column('text', {
    //     array: true,
    //     default: [],
    // })
    // tags: string[];

    /*
    @BeforeInsert()
    checkSlugInsert() {
        if(!this.slug) {
            this.slug = this.title;
        }

        this.slug = this.slug
        .toLowerCase()
        .replaceAll(' ', '_')
        .replaceAll("'", ' ')
    }
    */

    /*
    @BeforeUpdate()
    checkSlugUpdate() {
        this.slug = this.slug
        .toLowerCase()
        .replaceAll(' ', '_')
        .replaceAll("'", ' ')
    }
    */
}
