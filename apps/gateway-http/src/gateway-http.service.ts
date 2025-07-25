import { Injectable } from '@nestjs/common';

@Injectable()
export class GatewayHttpService {
  getHello(): string {
    return 'Hello World!';
  }
}
