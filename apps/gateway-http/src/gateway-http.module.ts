import { Module } from '@nestjs/common';
import { GatewayHttpController } from './gateway-http.controller';
import { GatewayHttpService } from './gateway-http.service';

@Module({
  imports: [],
  controllers: [GatewayHttpController],
  providers: [GatewayHttpService],
})
export class GatewayHttpModule {}
