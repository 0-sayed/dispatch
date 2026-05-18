import { Module } from '@nestjs/common';

import { DispatchCommonModule } from '@dispatch/common';
import { DispatchLoggingModule } from '@dispatch/logging';

@Module({
  imports: [DispatchLoggingModule, DispatchCommonModule],
})
export class AuthModule {}
