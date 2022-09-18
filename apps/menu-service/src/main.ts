import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { MenuServiceModule } from './menu-service.module';

async function bootstrap() {
  // const app = await NestFactory.create(MenuServiceModule);
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(MenuServiceModule, {
    transport: Transport.GRPC,
    options: {
      package: 'menu',
      protoPath: join(__dirname, 'proto/menu.proto'),
      loader: {
        arrays: true
      }
    },
  });
  await app.listen();
  // await app.listen(5000);
}
bootstrap();
