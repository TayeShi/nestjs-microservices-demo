import { NestFactory } from '@nestjs/core';
import { GatewayHttpModule } from './gateway-http.module';

async function bootstrap() {
  const app = await NestFactory.create(GatewayHttpModule);
  await app.listen(process.env.port ?? 8010);
}
void bootstrap();
