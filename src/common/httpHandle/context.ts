import { Injectable, Scope, Inject } from "@nestjs/common";
import { REQUEST } from "@nestjs/core";
import { User } from "src/entity/user.entity";

/**
* 请求上下文
*/
@Injectable({ scope: Scope.REQUEST })
export class Context {

  constructor(@Inject(REQUEST) private readonly request: Request) { }

  // async getUser(): Promise<User> {
  //   return this.request.user;
  // }
}