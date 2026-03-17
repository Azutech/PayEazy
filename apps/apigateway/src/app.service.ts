import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'We gets paid full time!! Chang Ching 💲💰';
  }
}
