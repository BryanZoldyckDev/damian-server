import { IsArray, IsIn, IsInt, IsString, MaxLength } from "class-validator";

export class CreateCampusDto {
    @MaxLength(6)
    @IsInt()
    campus_code: number;

    @IsString()
    campus_name: string;
    
    @IsString()
    campus_location: string;

    @IsString({each: true})
    @IsArray()
    //@IsIn(['lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sábado', 'domingo'])
    attention_day: string[];
}
