import axios, { AxiosError } from "axios";

export interface BaseResponse <T>{
  status: boolean,
  data: T,
  message?: string;
}

export const HandleError = <T extends BaseResponse<null>>(_error: unknown) => {
  const error = _error as Error | AxiosError;
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<T>;
    if (axiosError && axiosError.response) {
      
      const { data } = axiosError.response;
      return { 
        status: data?.status || false, 
        data: data.status || null, 
        message: data?.message 
      } as BaseResponse<null>;
    }
  }

  return { status: false, data: null, message: error?.message };
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