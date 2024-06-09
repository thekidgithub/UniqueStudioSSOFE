import {
  getInfoResponse,
} from '@/constants/httpMsg/register/InfoStatusMsg';

import request from '../_request';

export async function getInfo(): Promise<getInfoResponse> {
  const res: getInfoResponse = await request({
    url: '/user/my',
    method: 'GET',
  });
  return res;
}
