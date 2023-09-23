import { IsIn, IsInt, MaxLength } from "class-validator";

export class CreateModuleDto {
    @IsInt()
    @MaxLength(4)
    module_year: number;
    
    @IsInt()
    @MaxLength(1)
    @IsIn([1, 2, 3, 4, 5])
    module: number;
}
