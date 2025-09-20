import { Injectable, LoggerService as NestLoggerService, Inject } from '@nestjs/common';
import type { ConfigType } from '@nestjs/config';
import * as bunyan from 'bunyan';
import loggerConfig from '../../config/logger.config';

@Injectable()
export class LoggerService implements NestLoggerService {
  private readonly logger: bunyan;

  constructor(
    @Inject(loggerConfig.KEY)
    private readonly config: ConfigType<typeof loggerConfig>,
  ) {
    this.logger = bunyan.createLogger({
      name: this.config.name,
      level: this.config.level,
      streams: this.config.streams,
    });
  }

  log(message: any, context?: string) {
    this.logger.info({ context }, message);
  }

  error(message: any, trace?: string, context?: string) {
    this.logger.error({ context, trace }, message);
  }

  warn(message: any, context?: string) {
    this.logger.warn({ context }, message);
  }

  debug(message: any, context?: string) {
    this.logger.debug({ context }, message);
  }

  verbose(message: any, context?: string) {
    this.logger.trace({ context }, message);
  }

  info(message: any, context?: string, meta?: any) {
    this.logger.info({ context, ...meta }, message);
  }

  logRequest(method: string, url: string, statusCode: number, responseTime: number, userId?: string) {
    this.logger.info({
      type: 'http_request',
      method,
      url,
      statusCode,
      responseTime,
      userId,
    }, `${method} ${url} ${statusCode} - ${responseTime}ms`);
  }

  logError(error: Error, context?: string, userId?: string) {
    this.logger.error({
      type: 'error',
      context,
      userId,
      stack: error.stack,
      message: error.message,
    }, `Error in ${context}: ${error.message}`);
  }

  logServiceCall(service: string, method: string, duration: number, success: boolean, meta?: any) {
    this.logger.info({
      type: 'service_call',
      service,
      method,
      duration,
      success,
      ...meta,
    }, `${service}.${method} ${success ? 'SUCCESS' : 'FAILED'} - ${duration}ms`);
  }
}