import { Gender } from '@/views/user/editInfo/type';
import { HttpRes } from '../_httpResTemplate';

export interface EditRequest {
  name: string;
  gender: Gender;
  password: string;
  email: string;
}

export type EditResponse = HttpRes<{
  message: string;
  data: string;
}>;
