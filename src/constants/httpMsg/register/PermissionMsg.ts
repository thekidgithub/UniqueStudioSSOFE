import { HttpRes } from '../_httpResTemplate';

export interface PermissionRequest {
  phone: string;
  joinTime: string;
  group: string;
  role: string;
}

export type PermissionResponse = HttpRes<{
  message: string;
  data: string;
}>;
