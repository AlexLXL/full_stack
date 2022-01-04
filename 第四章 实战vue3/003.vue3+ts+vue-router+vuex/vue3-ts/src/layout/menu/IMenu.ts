interface IMenuListMeta {
  title: string,
  icon?: string,
  icon2: string,
  roles: string[],
  parentId?: number
}

export interface IMenuList {
  path: string,
  component: string,
  alwaysShow?: boolean,
  name?: string,
  meta: IMenuListMeta,
  children?: IMenuList[]
}