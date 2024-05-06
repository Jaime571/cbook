import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { CredencialesModule } from 'src/credenciales/credenciales.module';
import { LibroModule } from 'src/libro/libro.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USER'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        entities: ["dist/**/*.entity{.ts,.js}"],
        //No utilizar "synchronize: true" en prod
        synchronize: true,
        retryAttempts: 5,
        retryDelay: 3000,
        autoLoadEntities: true
      }),
    }),
    AuthModule, CredencialesModule, LibroModule],
  controllers: [],
  // providers: [AppService],
})
export class AppModule { }