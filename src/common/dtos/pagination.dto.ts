import { Type } from "class-transformer";
import { IsOptional, IsPositive, Min } from "class-validator";

export class PaginationDto {
    
    @IsOptional()
    @IsPositive()
    @Type(() => Number)//enableImplicitCoversions: true
    //transform
    limit?: number;
    @IsOptional()
    @Min(0)
    @Type(() => Number)//enableImplicitCoversions: true

    offset?: number
}