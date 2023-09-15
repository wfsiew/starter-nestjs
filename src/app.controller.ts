import { Body, Controller, Get, HttpCode, HttpStatus, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { AppService } from './app.service';
import { WallexWebhookDto } from './dto/wallex.dto';
import { IPayPaymentResponseDto } from './dto/ipay.dto';
import { lastValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { Agent } from 'https';

@Controller()
export class AppController {

  constructor(
    private readonly appService: AppService,
    private readonly httpService: HttpService
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('backend/backend_response')
  async WebhookTest() {
    return {
      success: 'ok'
    }
  }

  @HttpCode(HttpStatus.OK)
  @Post('backend/backend_response')
  async Webhook(@Body() data: WallexWebhookDto) {
    console.log('called backend response');
    console.log(data);
    const o = {
      resource: data.resource,
      resourceId: data.resourceId,
      accountId: data.accountId,
      status: data.status,
      remarks: data.remarks,
      reason: data.reason
    }
    const url = 'https://202.73.42.183:43902/mobile_central_2_0_0/wallex/backend/backend_response';
    await lastValueFrom(this.httpService.post(url, o, {
      httpsAgent: new Agent({
        rejectUnauthorized: false
      })
    }));
    return {
      success: 'ok',
      data
    }
  }

  @HttpCode(HttpStatus.OK)
  @Post('payment/ipay88/backend/backend_response')
  async backendPostResponse(@Body() data: IPayPaymentResponseDto, @Res({ passthrough: true }) res: Response) {
    console.log('backendPostResponse');
    console.log(data);
    res.setHeader('Content-Type', 'text/plain');
    const qs = this.appService.buildResponseSignature(data.PaymentId, data.RefNo, data.Amount, data.Currency, data.Status);
    let r = 'Fail';
    if (data.Status == '1' && qs === data.Signature) {
      r = 'RECEIVEOK';
    }

    return r;
  }
}
