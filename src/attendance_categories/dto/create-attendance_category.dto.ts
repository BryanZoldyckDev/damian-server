import { IsArray, IsIn, IsOptional, IsString } from "class-validator";

export class CreateAttendanceCategoryDto {
    @IsIn(['Presente', 'Permiso', 'Desertó'])
    @IsString()
    attendance_category: string;

    // @IsString({each: true})
    // @IsArray()
    // @IsOptional()
    // tags: string[]
}
