import { registerAs } from '@nestjs/config';
import * as bunyan from 'bunyan';

export interface LoggerConfig {
  name: string;
  level: bunyan.LogLevel;
  streams: bunyan.Stream[];
}

export default registerAs(
  'logger',
  (): LoggerConfig => ({
    name: 'blue-escape-backend',
    level: (process.env.LOG_LEVEL as bunyan.LogLevel) || 'info',
    streams: [
      {
        level: 'info',
        stream: process.stdout,
      },
      {
        level: 'error',
        stream: process.stderr,
      },
      ...(process.env.NODE_ENV === 'production'
        ? [
            {
              level: 'info' as bunyan.LogLevel,
              path: './logs/app.log',
            },
            {
              level: 'error' as bunyan.LogLevel,
              path: './logs/error.log',
            },
          ]
        : []),
    ],
  }),
);