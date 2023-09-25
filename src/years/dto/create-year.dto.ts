import { IsIn, IsInt, MaxLength } from "class-validator";

export class CreateYearDto {

    @IsIn([1,2])
    @IsInt()
    year: number;

}
