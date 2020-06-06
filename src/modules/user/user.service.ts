import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './userDto';
import { User } from '../../entity/user.entity';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>
  ) { }

  /**
  * 获取用户
  */
  async getUserList() {
    // const userList = await this.usersRepository.find();
    // console.log(userList)
    return [];
  }

  /**
  * 获取用户
  */
  async findOneByAccount(account: string) {
    const user = new User();
    user.account = '8888';
    user.name = 'test';
    user.password = '1';
    return user;
    //return await this.usersRepository.findOne({ where: { account: account } });
  }

  /**
  * 创建用户
  */
  async createUser(dto: CreateUserDto): Promise<User> {
    const user = new User();
    user.name = dto.name;
    user.account = dto.account;
    return user;
  }

  /**
  * 创建用户
  */
  async findOne(username: string): Promise<User | undefined> {
    const user = new User();
    user.name = username;
    user.password = "1";
    return user;
  }
}
