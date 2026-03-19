import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  getIndex() {
    return { title: 'Real Estate - Home' };
  }

  @Get('about')
  @Render('about')
  getAbout() {
    return { title: 'About Us' };
  }
}
