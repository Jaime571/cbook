import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [],
  // providers: [AppService],
})
export class AppModule {}