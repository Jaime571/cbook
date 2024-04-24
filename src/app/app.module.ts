import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'admin',
      database: 'test2',
      entities: [],
      //No utilizar "synchronize: true" en prod
      synchronize: true,
      retryAttempts: 5,
      retryDelay: 3000,
      autoLoadEntities: true
    }),
    AuthModule],
  controllers: [],
  // providers: [AppService],
})
export class AppModule {}