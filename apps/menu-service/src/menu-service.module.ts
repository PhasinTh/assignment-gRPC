import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { MenuServiceController } from './menu-service.controller';
import { MenuServiceService } from './menu-service.service';
import { Menu } from './menu.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: Number(process.env.DB_PORT) || 5432,
      username: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASSWORD  || 'postgres',
      database: process.env.DB_DATABASE  || 'postgres',
      synchronize: true,
      autoLoadEntities: true,
      // entities: [join(__dirname, '../../' , '**', '*.entities.{js,ts}')],
    }),
    TypeOrmModule.forFeature([Menu])
  ],
  controllers: [MenuServiceController],
  providers: [MenuServiceService],
})
export class MenuServiceModule {}
