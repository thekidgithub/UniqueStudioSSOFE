import {
  PermissionRequest,
  PermissionResponse,
} from '@/constants/httpMsg/register/PermissionMsg';

import request from '../_request';

export async function permission(
  data: PermissionRequest,
): Promise<PermissionResponse> {
  const res: PermissionResponse = await request({
    url: 'v1/user/permission',
    method: 'POST',
    data,
  });
  return res;
}
