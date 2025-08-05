import { Body, Controller, Inject, Post } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { AccountService, SignInResp } from '@app/proto/proto/service_account';
import { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom, Observable } from 'rxjs';

@Controller('accounts')
export class AccountsController {
  private accountService: AccountService;
  constructor(
    private readonly accountsService: AccountsService,
    @Inject('ACCOUNT_SERVICE') private accountGrpcClient: ClientGrpc,
  ) {}

  onModuleInit() {
    this.accountService =
      this.accountGrpcClient.getService<AccountService>('AccountService');
  }

  @Post('sign-in')
  async signIn(@Body() body: { username: string; password: string }) {
    const signInResult = await firstValueFrom(
      this.accountService.SignIn({
        username: body.username,
        password: body.password,
      }) as unknown as Observable<SignInResp>,
    );
    if (signInResult.errorCode?.code === 0) {
      return {
        token: signInResult.token,
      };
    }
    return {
      token: '',
    };
  }
}
