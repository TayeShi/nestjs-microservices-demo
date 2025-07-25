import { Test, TestingModule } from '@nestjs/testing';
import { GatewayHttpController } from './gateway-http.controller';
import { GatewayHttpService } from './gateway-http.service';

describe('GatewayHttpController', () => {
  let gatewayHttpController: GatewayHttpController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [GatewayHttpController],
      providers: [GatewayHttpService],
    }).compile();

    gatewayHttpController = app.get<GatewayHttpController>(GatewayHttpController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(gatewayHttpController.getHello()).toBe('Hello World!');
    });
  });
});
