import type {
  PingResponse,
} from '@/constants/httpMsg/register/PingStatusMsg';

import request from '../_request';

export async function ping(): Promise<PingResponse> {
  const res: PingResponse = await request({
    url: 'v1/ping',
    method: 'GET',
  });
  return res;
}
