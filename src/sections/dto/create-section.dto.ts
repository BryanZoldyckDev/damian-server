import { IsIn, IsString, MinLength } from "class-validator";

export class CreateSectionDto {
    @IsString()
    @MinLength(1)
    @IsIn(['A', 'B', 'C', 'D', 'E'])
    section: string;
}
