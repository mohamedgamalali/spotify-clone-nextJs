import { Injectable, Inject } from '@nestjs/common';
import { DevConfigService } from './common/providers/DevConfigService';

@Injectable()
export class AppService {
  constructor(
    private readonly devConfigService: DevConfigService,
    @Inject('APP_PORT') private readonly appPort: number,
  ) {}
  getHello(): string {
    return `Hello World! from ${this.devConfigService.getDBHost()}, Factory host => ${this.appPort}`;
  }
}
