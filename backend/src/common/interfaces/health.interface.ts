export interface HealthCheck {
  status: 'ok' | 'degraded' | 'error';
  timestamp: string;
  uptime: number;
  environment: string;
  services: Record<string, {
    status: 'UP' | 'DOWN';
    details?: string;
  }>;
  version: string;
}

export interface ServiceStatus {
  status: 'UP' | 'DOWN';
  details?: string;
}