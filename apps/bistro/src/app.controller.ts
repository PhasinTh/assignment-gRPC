import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { Menu } from 'apps/menu-service/src/menu.entity';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService){}

  @Get()
  find(): any {
    return this.appService.findAll()
  }
  
  @Get(':id')
  findMenuById(@Param() params: Menu): any {
    return this.appService.findOne(params.id)
  }

  @Delete(':id')
  deleteMenuById(@Param() params: Menu): any {
    return this.appService.removeById(params.id)
  }

  @Post()
  async createMenu(@Body() menu: Menu): Promise<Menu> {
    return this.appService.createOne(menu);
  }

}
