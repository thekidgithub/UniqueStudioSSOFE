import {
  LogoutResponse,
} from '@/constants/httpMsg/register/LogoutStatusMsg';

import request from '../_request';

export async function logout(): Promise<LogoutResponse> {
  const res: LogoutResponse = await request({
    url: 'v1/logout',
    method: 'POST',
  });
  return res;
}
