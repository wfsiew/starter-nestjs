import { Body, Controller, Get, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { WallexWebhookDto } from './dto/wallex.dto';
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
}
