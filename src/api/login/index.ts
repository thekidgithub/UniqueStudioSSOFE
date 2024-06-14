import {
  phoneLoginRequest,
  smsLoginRequest,
  LoginResponse,
} from '@/constants/httpMsg/register/LoginStatusMsg';
import request from '../_request';

export async function ssoLogin(
  data: phoneLoginRequest | smsLoginRequest,
): Promise<LoginResponse> {
  const res: LoginResponse = await request({
    url: '/v1/login',
    method: 'POST',
    data,
  });
  return res;
}
