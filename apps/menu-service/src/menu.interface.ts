export interface MenuService {
    findMenu(data: Empty): Promise<Menu[]>
    findMenuById(data: MenuById): Promise<Menu>
    createMenu(data: CreateMenuInput): Promise<Menu>
    updateMenu(data: UpdateMenuInput): Promise<Menu>
    deleteMenu(data: MenuById): Promise<Menu>
}

export interface Menu {
    id: string
    name: string
    price: number
}

export interface CreateMenuInput {
    name: string
    price: number
}

export interface UpdateMenuInput {
    id: string
    name: string
    price: number
}

export interface MenuList {
    menus: Menu[]
}

export interface MenuById {
    id: string
}

export interface Empty {}