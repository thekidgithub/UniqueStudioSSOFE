import { HttpRes } from '../_httpResTemplate';

export interface phoneLoginRequest {
  phone: string;
  password: string;
}

export interface smsLoginRequest {
  phone: string;
  validateCode: string;
}

export type LoginResponse = HttpRes<{
  message: string;
  data: string;
}>;
