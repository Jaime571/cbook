import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { Credenciales } from 'src/credenciales/credenciales.entity';
import { CredencialesModule } from 'src/credenciales/credenciales.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'admin',
      database: 'test2',
      entities: ['dist/**/*.entity{.ts,.js}'],
      //No utilizar "synchronize: true" en prod
      synchronize: true,
      retryAttempts: 5,
      retryDelay: 3000,
      autoLoadEntities: true,
    }),
    AuthModule,
    CredencialesModule,
  ],
  controllers: [],
  // providers: [AppService],
})
export class AppModule {}
