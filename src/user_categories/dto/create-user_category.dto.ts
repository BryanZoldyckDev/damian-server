import { IsIn, IsString } from "class-validator";

export class CreateUserCategoryDto {
    @IsString()
    @IsIn(['alumno', 'maestro', 'administrador'])
    user_category: string;
}
