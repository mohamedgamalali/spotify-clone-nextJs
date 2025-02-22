import { Injectable } from '@nestjs/common';

@Injectable()
export class DevConfigService {
  getDBHost(): string {
    return 'localhost';
  }
}
