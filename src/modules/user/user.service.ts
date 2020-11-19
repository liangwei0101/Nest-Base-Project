import { Injectable, Put, HttpStatus } from '@nestjs/common';
import { InjectRepository, InjectConnection } from '@nestjs/typeorm';
import { Repository, createQueryBuilder, Connection } from 'typeorm';
import { User } from '../../entity/user/user.entity';
import { orderParamsHandle, timeParamsHandle } from '../../common/utils/typeormUtil';
import { IPagination, Pagination } from '../../common/class/pagination';
import { createSomeDigitNumber } from '../../common/utils/stringUtil';
import { encryptPassword } from '../../common/utils/cryptogramUtil';
import { UserConfig } from '../../entity/user/user.config.entity';
import { RoleEnum } from '../../common/enum/role.enum';
import { CustomException } from '../../common/httpHandle/customException';
import { UserInput } from './userDto';
import { updateObjectPartField } from '../../common/utils/objectUtil';
import { IQueryParams } from '../../common/interface/IQueryParams';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private usersRepository: Repository<User>, @InjectConnection() private readonly connection: Connection) {}

  //#region dataloader

  //#endregion

  /**
   * 获取用户
   */
  async getUserList(queryParams: IQueryParams): Promise<Pagination<User>> {
    const tableOtherName = 'user';
    const condition: any = {};
    // 时间参数处理
    timeParamsHandle(condition, queryParams.filter);
    // 排序参数处理
    const orderByCondition = orderParamsHandle(tableOtherName, queryParams.order);
    const [data, total] = await createQueryBuilder(User, tableOtherName)
      .skip(queryParams.pagination.page)
      .take(queryParams.pagination.limit)
      .where(condition)
      .orderBy(orderByCondition)
      .getManyAndCount();

    return new Pagination<User>({ data, total });
  }

  /**
   * 获取用户
   */
  async findOneByAccount(account: string) {
    return await this.usersRepository.findOne({
      where: [{ phone: account }, { email: account }],
    });
  }

  /**
   * 根据用户账户和密码查询用户
   */
  async findOneByAccountAndPasswd(account: string, password: string) {
    password = encryptPassword(password);
    return this.usersRepository.findOne({
      where: [
        { phone: account, password },
        { email: account, password },
      ],
    });
  }

  /**
   * 创建新用户
   */
  async createNewUser(): Promise<User> {
    const user = new User();
    user.name = '梁二狗111';
    user.phone = createSomeDigitNumber(6);
    user.email = createSomeDigitNumber(6);
    user.id = createSomeDigitNumber(6);

    return user;
  }

  /**
   * 创建用户
   */
  async createUser(): Promise<User> {
    const user = new User();
    user.name = '梁二狗';
    user.phone = createSomeDigitNumber(6);
    user.email = createSomeDigitNumber(6);
    user.id = createSomeDigitNumber(6);
    const res = await this.usersRepository.save(user);
    return res;
  }

  /**
   * 更新用户部分信息
   */
  async updateUserInfo(updateUserInfoInput: UserInput) {
    // 用户表里更新字段的白名单
    const whitelist = ['phone', 'password', 'paymentPassword', 'role', 'nickname', 'email', 'manageUserId', 'remarks'];

    const dbUser = await this.usersRepository.findOneOrFail({ id: updateUserInfoInput.id });
    // 按白名单更新部分字段
    updateObjectPartField(dbUser, updateUserInfoInput, whitelist);

    return await this.usersRepository.save(dbUser);
  }

  //#region 私有函数

  //#endregion

  //#region 重构代码数据传输接口
  /**
   * 创建用户
   */
  async createUserForRe(params: User) {
    const userObj = new User();
    Object.assign(userObj, params);
    return await this.usersRepository.save(userObj);
  }
  //#endregion
}
