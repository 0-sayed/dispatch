import { describe, expect, it } from 'vitest';

import { HealthController } from './health.controller';

describe('HealthController', () => {
  const controller = new HealthController();

  it('returns an ok health response', () => {
    const response = controller.check();

    expect(response.status).toBe('ok');
    expect(response.uptimeSeconds).toBeGreaterThanOrEqual(0);
    expect(new Date(response.timestamp).toString()).not.toBe('Invalid Date');
  });

  it('returns ok liveness and readiness responses', () => {
    expect(controller.live().status).toBe('ok');
    expect(controller.ready().status).toBe('ok');
  });
});
