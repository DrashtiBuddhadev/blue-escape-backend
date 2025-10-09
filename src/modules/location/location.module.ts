import { Module } from '@nestjs/common';
import { LocationService } from './location.service';
import { LocationController } from './location.controller.v1';

@Module({
  controllers: [LocationController],
  providers: [LocationService],
  exports: [LocationService],
})
export class LocationModule {}