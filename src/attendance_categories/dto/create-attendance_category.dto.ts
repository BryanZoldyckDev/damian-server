import { IsIn, IsString } from "class-validator";

export class CreateAttendanceCategoryDto {
    @IsIn(['Presente', 'Ausente', 'Desertó'])
    @IsString()
    attendance_category: string;
}
