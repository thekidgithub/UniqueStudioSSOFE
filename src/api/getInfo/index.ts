import {
  getInfoResponse,
} from '@/constants/httpMsg/register/InfoStatusMsg';

import request from '../_request';

export async function getInfo(): Promise<getInfoResponse> {
  const res: getInfoResponse = await request({
    url: 'v1/user/my',
    method: 'GET',
  });
  return res;
}
