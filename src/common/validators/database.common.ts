import { BadRequestException, InternalServerErrorException, Logger } from '@nestjs/common';

export class DatabaseCommon {
  private static logger = new Logger('DatabaseCommonException');

  static handleDBExceptions(error: any) {
    if (error.code === '23505')
      throw new BadRequestException(error.detail);

    this.logger.error(error);
    throw new InternalServerErrorException('Unexpected error, check logs');
  }
}