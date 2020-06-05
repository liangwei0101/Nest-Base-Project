import { SetMetadata } from '@nestjs/common'

/**
* 接口是否要验证
*/
export const NoAuth = () => SetMetadata('no-auth', true);

/**
* 接口角色
*/
export const Roles = (...roles: string[]) => SetMetadata('roles', roles);