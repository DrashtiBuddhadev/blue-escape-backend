import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as entities from '../entities';

export default registerAs(
  'database',
  (): TypeOrmModuleOptions => {
    const isProduction = process.env.NODE_ENV === 'production';
    
    return {
      type: 'mysql',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '3306', 10),
      username: process.env.DB_USERNAME || 'blue_escape_user',
      password: process.env.DB_PASSWORD || 'blue_escape_password',
      database: process.env.DB_DATABASE || 'blue_escape_db',
      entities: Object.values(entities),
      synchronize: process.env.NODE_ENV === 'development',
      logging: process.env.NODE_ENV === 'development',
      connectTimeout: 60000,
      extra: {
        connectionLimit: isProduction ? 20 : 10,
        waitForConnections: true,
        queueLimit: 0,
        // Enable connection pooling optimizations for production
        ...(isProduction && {
          maxIdle: 10,
          idleTimeout: 60000,
          enableKeepAlive: true,
          keepAliveInitialDelay: 0,
        }),
      },
      // Connection pool settings
      maxQueryExecutionTime: isProduction ? 5000 : 10000,
      // Disable automatic migrations in production
      migrationsRun: false,
    };
  },
);