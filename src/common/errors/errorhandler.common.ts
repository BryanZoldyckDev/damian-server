import { NotFoundException } from "@nestjs/common"

export class ErrorHandlerCommon {
    
    static notFoundHandler(table: string, term: string){
        throw new NotFoundException(`${table} with search term ${term} not found`);
    }
}