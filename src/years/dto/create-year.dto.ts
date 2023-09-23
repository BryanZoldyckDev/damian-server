import { IsIn, IsInt, MaxLength } from "class-validator";

export class CreateYearDto {

    @IsIn([1,2])
    @MaxLength(1)
    @IsInt()
    year: number;

}
