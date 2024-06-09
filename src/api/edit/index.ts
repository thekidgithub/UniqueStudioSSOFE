import {
  EditRequest,
  EditResponse,
} from '@/constants/httpMsg/register/EditStatusMsg';

import request from '../_request';

export async function edit(
  data: EditRequest,
): Promise<EditResponse> {
  const res: EditResponse = await request({
    url: 'v1/user/my',
    method: 'PUT',
    data,
  });
  return res;
}
