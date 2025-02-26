import { HttpRes } from '../_httpResTemplate';

export interface PermissionRequest {
  phoneNumber: string;
  joinTime: string;
  group: string;
  role: string;
}

export type PermissionResponse = HttpRes<{
  message: string;
  data: string;
}>;
