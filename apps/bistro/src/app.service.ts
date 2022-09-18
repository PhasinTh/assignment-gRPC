import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Menu, MenuById, MenuService } from 'apps/menu-service/src/menu.interface';
import { Observable } from 'rxjs';


@Injectable()
export class AppService implements OnModuleInit {
  private menuService: MenuService
  constructor(
    @Inject('MENU_PACKAGE') private menuClient: ClientGrpc
  ) {}

  onModuleInit() {
    this.menuService = this.menuClient.getService<MenuService>('MenuService');
  }

  findAll(): Promise<Menu[]> {
    return this.menuService.findMenu({});
  }

  findOne(id: string): Promise<Menu> {
    return this.menuService.findMenuById({id: id})
  }

  removeById(id: string): Promise<Menu> {
    return this.menuService.deleteMenu({id: id})
  }

  createOne(menu: Menu): Promise<Menu> {
    return this.menuService.createMenu(menu)
  }
}
