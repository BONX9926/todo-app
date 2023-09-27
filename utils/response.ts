export interface BaseResponse <T>{
  status: boolean,
  data: T,
  message?: string;
}

export const SuccessResponse = <T,>(data?: T, message: string = "success") => {
  return {
    status: true,
    data,
    message
  }
}

export const ErrorResponse = (message: string = "error") => {
  return {
    status: false,
    data: null,
    message
  }
}