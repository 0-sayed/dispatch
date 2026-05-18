import { Controller, Get } from '@nestjs/common';
import {
  ApiOkResponse,
  ApiOperation,
  ApiProperty,
  ApiTags,
} from '@nestjs/swagger';

type HealthStatus = 'ok';

class HealthResponseDto {
  @ApiProperty({ example: 'ok' })
  declare status: HealthStatus;

  @ApiProperty({ example: '2026-05-18T00:00:00.000Z' })
  declare timestamp: string;

  @ApiProperty({ example: 42 })
  declare uptimeSeconds: number;
}

type HealthResponse = HealthResponseDto;

function createHealthResponse(): HealthResponse {
  return {
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptimeSeconds: Math.round(process.uptime()),
  };
}

@ApiTags('health')
@Controller('health')
export class HealthController {
  @ApiOperation({ summary: 'Check service health' })
  @ApiOkResponse({ type: HealthResponseDto })
  @Get()
  check(): HealthResponse {
    return createHealthResponse();
  }

  @ApiOperation({ summary: 'Check liveness' })
  @ApiOkResponse({ type: HealthResponseDto })
  @Get('live')
  live(): HealthResponse {
    return createHealthResponse();
  }

  @ApiOperation({ summary: 'Check readiness' })
  @ApiOkResponse({ type: HealthResponseDto })
  @Get('ready')
  ready(): HealthResponse {
    return createHealthResponse();
  }
}
