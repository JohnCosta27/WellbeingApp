export interface ResponseBody<TType extends 'success' | 'error', TData extends object> {
  readonly type: TType;
  readonly body: TData;
}

export namespace Auth {
  export type Response = Success | Error;
  export type RefreshResponse = SuccessRefresh | Error;

  type Success = ResponseBody<'success', {
    readonly refresh: string;
    readonly access: string;
  }>
  
  type SuccessRefresh = ResponseBody<'success', {
    readonly access: string;
  }>

  type Error = ResponseBody<'error', {
    readonly error: string;
  }>

  export interface ReqBody {
    email: string;
    password: string;
  }
}
