import { HttpRes } from '../_httpResTemplate';

export type LogoutResponse = HttpRes<{
  message: string;
  data: string;
}>;
