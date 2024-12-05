interface APIResponseSuccess<T> {
  status: number;
  data: T;
}

interface APIResponseError {
  status: number;
  error: {
    message: string;
    errorCode?: string;
  }
}

export type APIResponse<T> = APIResponseSuccess<T> | APIResponseError

export function isError(response: APIResponse<any>): response is APIResponseError {
  return "error" in response
}