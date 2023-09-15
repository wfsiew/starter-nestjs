import { HttpService } from '@nestjs/axios';
import { Injectable, OnModuleInit } from '@nestjs/common';
const { createHash } = require('crypto');

@Injectable()
export class AppService implements OnModuleInit {

  private merchantKey: string;
  private merchantCode: string;

  constructor(private readonly httpService: HttpService) {}

  onModuleInit() {
    this.merchantKey = 'YVvAUQrdHO';
    this.merchantCode = 'M33726';
  }
  
  getHello(): string {
    return 'Hello World!';
  }

  buildResponseSignature(paymentid: string, refno: string, amount: string, currency: string, status: string): string {
    const amt = amount.replace('.', '').replace(',', '');
    const s = `${this.merchantKey}${this.merchantCode}${paymentid}${refno}${amt}${currency}${status}`;
    const r = createHash('sha256').update(s).digest('hex');
    return r;
  }
}
