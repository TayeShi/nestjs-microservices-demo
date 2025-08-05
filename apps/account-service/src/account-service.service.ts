import {
  SignInReq,
  SignInResp,
  VerifyTokenReq,
  VerifyTokenResp,
} from '@app/proto/proto/service_account';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AccountServiceService {
  // eslint-disable-next-line @typescript-eslint/require-await
  async signIn(paload: SignInReq): Promise<Partial<SignInResp>> {
    if (paload.username === 'admin' && paload.password === '123456') {
      return {
        errorCode: {
          code: 0,
          message: 'success',
        },
        token: 'zxcvbnm',
      };
    }
    return {
      errorCode: {
        code: 1,
        message: 'fail',
      },
    };
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  async verifyToken(paload: VerifyTokenReq): Promise<Partial<VerifyTokenResp>> {
    if (paload.token === 'zxcvbnm') {
      return {
        errorCode: {
          code: 0,
          message: 'success',
        },
      };
    }
    return {
      errorCode: {
        code: 1,
        message: 'fail',
      },
    };
  }
}
