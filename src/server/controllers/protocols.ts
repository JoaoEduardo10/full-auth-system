import { UserDTO } from "../interface/interfaceDTO";

export interface ApiResponse<B> {
  token?: string;
  body: B;
  statusCode: number;
}

export interface ApiRequest {
  user?: any;
  body?: UserDTO;
  params?: any;
  headers?: any;
}

export interface IControllers {
  handle(req: ApiRequest): Promise<ApiResponse<unknown>>;
}
