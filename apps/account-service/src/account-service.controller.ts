import { Controller } from '@nestjs/common';
import { AccountServiceService } from './account-service.service';
import { GrpcMethod } from '@nestjs/microservices';
import {
  SignInReq,
  SignInResp,
  VerifyTokenReq,
  VerifyTokenResp,
} from '@app/proto/proto/service_account';

@Controller()
export class AccountServiceController {
  constructor(private readonly accountServiceService: AccountServiceService) {}

  @GrpcMethod('AccountService', 'SignIn')
  async signIn(paload: SignInReq): Promise<Partial<SignInResp>> {
    return await this.accountServiceService.signIn(paload);
  }

  @GrpcMethod('AccountService', 'VerifyToken')
  async verifyToken(paload: VerifyTokenReq): Promise<Partial<VerifyTokenResp>> {
    return await this.accountServiceService.verifyToken(paload);
  }
}
