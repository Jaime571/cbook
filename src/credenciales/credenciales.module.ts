import { Module } from '@nestjs/common';
import { CredencialesService } from './credenciales.service';
import { CredencialesController } from './credenciales.controller';
import { Credenciales } from './credenciales.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Credenciales])],
  exports: [TypeOrmModule, CredencialesService],
  providers: [CredencialesService],
  controllers: [CredencialesController],
})
export class CredencialesModule {}
