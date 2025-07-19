import { Injectable } from '@nestjs/common';
import { IApiResponse } from './response.interface';

@Injectable()
export class ResponseHelper {
  /** USE FOR SUCCESS
   * ResponseHelper.success(data,'Login successful');
   **/
  static success<T>(
    data: T,
    message = 'Operation successful',
  ): IApiResponse<T> {
    return {
      status: true,
      message,
      data,
      statusCode: 200,
    };
  }

  /** USE FOR ERROR
    throw new HttpException(
      ResponseHelper.error(isValid),
      HttpStatus.NOT_FOUND,
    );
   **/

  static error(
    message = 'Something went wrong',
    data: any = null,
    errors?: any,
  ): IApiResponse<null> {
    return {
      status: false,
      message,
      data,
      statusCode: 500,
      errors: errors || null,
    };
  }
}
