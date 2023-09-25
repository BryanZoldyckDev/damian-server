import { IsIn, IsInt } from "class-validator";

export class CreateModuleDto {
    @IsInt()
    module_year: number;
    
    @IsInt()
    @IsIn([1, 2, 3, 4, 5])
    module: number;
}
