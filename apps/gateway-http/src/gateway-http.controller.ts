import { Controller, Get } from '@nestjs/common';
import { GatewayHttpService } from './gateway-http.service';

@Controller()
export class GatewayHttpController {
  constructor(private readonly gatewayHttpService: GatewayHttpService) {}

  @Get()
  getHello(): string {
    return this.gatewayHttpService.getHello();
  }
}
