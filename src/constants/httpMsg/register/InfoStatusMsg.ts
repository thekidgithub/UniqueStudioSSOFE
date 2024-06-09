import { HttpRes } from '../_httpResTemplate';

export type getInfoResponse = HttpRes<{
  message: string;
  data: string;
}>;
