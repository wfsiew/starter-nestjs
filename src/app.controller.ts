import { Body, Controller, Get, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { WallexWebhookDto } from './dto/wallex.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('backend/backend_response')
  async WebhookTest() {
    console.log('log here');
    return {
      success: 'ok'
    }
  }

  @HttpCode(HttpStatus.OK)
  @Post('backend/backend_response')
  async Webhook(@Body() data: WallexWebhookDto) {
    console.log('called backend response');
    console.log(data);
    return {
      success: 'ok',
      data
    }
  }
}
