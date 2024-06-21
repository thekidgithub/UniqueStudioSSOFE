import { HttpRes } from '../_httpResTemplate';

export type PingResponse = HttpRes<{
  message: string;
  data: string;
}>;
