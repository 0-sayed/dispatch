import { Module } from '@nestjs/common';

import { DispatchLoggingModule } from '@dispatch/logging';

@Module({
  imports: [DispatchLoggingModule],
})
export class ExecutorModule {}
