import { SetMetadata } from '@nestjs/common'

/**
* 接口是否要验证
*/
export const NoAuth = () => SetMetadata('no-auth', true);

/**
* 某个角色能访问
*/
export const Roles = (...roles: string[]) => SetMetadata('roles', roles);