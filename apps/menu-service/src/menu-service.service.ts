import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { Menu } from './menu.entity';
import { CreateMenuInput, UpdateMenuInput } from './menu.interface';

@Injectable()
export class MenuServiceService {
  private readonly logger = new Logger(MenuServiceService.name);

  constructor(
    @InjectRepository(Menu)
    private menuRepository: Repository<Menu>,
  ) {}

  findAll(): Promise<Menu[]> {
    this.logger.debug(`Recevied request for query menus`)
    return this.menuRepository.find();
  }

  findOne(id: string): Promise<Menu> {
    this.logger.debug(`Recevied id:${id}`)
    return this.menuRepository.findOneBy({ id });
  }

  async updateOne(menu: UpdateMenuInput): Promise<Menu> {
    this.logger.debug(`Update  menu id ${menu.id} with new data:${menu}`)
    const tempdata = await this.menuRepository.findOneBy({id: menu.id})
    if (!tempdata)
      return null
    
    tempdata.price = menu.price;
    tempdata.name  = menu.name
    return await this.menuRepository.save(tempdata);
  }

  async createOne(menu: CreateMenuInput): Promise<Menu> {
    this.logger.debug(`Create new menu with:${menu}`)
    const newMenu = new Menu();
    newMenu.name = menu.name;
    newMenu.price = menu.price;

    return await this.menuRepository.save(newMenu);
  }

  async remove(id: string): Promise<Menu> {
    this.logger.debug(`Remove menu id:${id}`)
    const menu = await this.menuRepository.findOneBy({ id });
    if (!menu)
      return null;
    return await this.menuRepository.remove(menu);
  }
}
