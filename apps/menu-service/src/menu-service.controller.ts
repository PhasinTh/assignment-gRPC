import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { MenuServiceService } from './menu-service.service';
import { Menu } from './menu.entity';
import { CreateMenuInput, MenuById, UpdateMenuInput } from './menu.interface';

@Controller()
export class MenuServiceController {
  constructor(private readonly menuServiceService: MenuServiceService) {}

  @Get()
  @GrpcMethod('MenuService', 'FindMenu')
  async find(): Promise<any> {
    const data = await this.menuServiceService.findAll();
    return {menus: data}
  }

  // @Get(':id')
  @GrpcMethod('MenuService', 'FindMenuById')
  findMenuById(data: MenuById): Promise<Menu> {
    const resutl = this.menuServiceService.findOne(data.id);
    return resutl;
  }

  @GrpcMethod('MenuService', 'CreateMenu')
  createMenu(data: CreateMenuInput): Promise<Menu> {
    return this.menuServiceService.createOne(data);
  }


  @GrpcMethod('MenuService', 'UpdateMenu')
  updateMenu(data: UpdateMenuInput): Promise<Menu> {
    return this.menuServiceService.updateOne(data);
  }

  @GrpcMethod('MenuService', 'DeleteMenu')
  deleteMenu(data: MenuById): Promise<Menu> {
    return this.menuServiceService.remove(data.id);
  }
}
