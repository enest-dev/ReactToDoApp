export class ServiceResponse<T> {
  data: T;
  isSuccess: boolean;
  error: Error;
  errorMessage: string;
  statusCode: number;

  public successResponse(data: any): ServiceResponse<T> {
    this.data = data;
    this.isSuccess = true;
    this.errorMessage = '';
    this.statusCode = 200;
    return this;
  }

  public errorResponse(errorMessage: string, code?: number): ServiceResponse<T> {
    this.data = null;
    this.isSuccess = false;
    this.errorMessage = errorMessage;
    this.statusCode = code;
    return this;
  }
}
