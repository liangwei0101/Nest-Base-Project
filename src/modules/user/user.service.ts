import { Injectable, Put, HttpStatus } from '@nestjs/common';
import { InjectRepository, InjectConnection } from '@nestjs/typeorm';
import { Repository, createQueryBuilder, Connection } from 'typeorm';
import { User, AccountType } from '../../entity/user/user.entity';
import { orderParamsHandle, timeParamsHandle } from '../../common/utils/typeormUtil';
import { IPagination, Pagination } from '../../common/class/pagination';
import { createSomeDigitNumber } from '../../common/utils/stringUtil';
import { Balance } from '../../entity/balance/balance.entity';
import { encryptPassword } from '../../common/utils/cryptogramUtil';
import { UserExtend } from '../../entity/user/user.extend.entity';
import { UserConfig } from '../../entity/user/user.config.entity';
import { UserCoupon } from '../../entity/coupon/coupon.entity';
import { RoleEnum } from '../../common/enum/role.enum';
import { BalanceService } from '../balance/balance.service';
import { CustomException } from '../../common/httpHandle/customException';
import { ApiErrorCodeEnum } from '../../common/enum/api-error.enum';
import DataLoader = require('dataloader');
import { v4 as uuid } from 'uuid';
import { InviteCodeService } from '../invite-code/invite-code.service';
import { UserInput } from './userDto';
import { updateObjectPartField } from '../../common/utils/objectUtil';
import { IQueryParams } from '../../common/interface/IQueryParams';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    @InjectConnection() private readonly connection: Connection,
    private readonly balanceService: BalanceService,
    private readonly inviteCodeService: InviteCodeService,
  ) {}

  //#region dataloader

  //#endregion

  /**
   * 注册第一步
   */
  async signUpStep1(user: User) {
    const userDB = await this.usersRepository.findOne({
      phone: user.phone,
      deleteTime: null,
    });
    if (userDB) throw new CustomException(ApiErrorCodeEnum.PhoneIsAleradyExist, ApiErrorCodeEnum.PhoneIsAleradyExistCode);

    if (user.inviteCode) {
      const authCodeObj = await this.inviteCodeService.findOneByInviteCode(user.inviteCode);
      user.userSource = user.inviteCode;
      user.inviteId = authCodeObj.userId;
    }

    // TODO id
    user.id = uuid();
    user.inviteCode = createSomeDigitNumber(6);
    user.password = encryptPassword(user.password);
    const userRes = await this.usersRepository.save(user);
    // TODO email

    return userRes;
  }

  /**
   * 注册第二步(KYC系统已完成)
   */
  async signUpStep2(user: User) {
    const userDB = await this.usersRepository.findOne(user);
    userDB.signUpProgress = 2;
    return await this.usersRepository.save(userDB);
  }

  /**
   * 注册第三步(email)
   */
  async signUpStep3(user: User) {
    await this.usersRepository.findOneOrFail({
      email: user.email,
      deleteTime: null,
    });

    const updateUserObj = await this.usersRepository.findOne({ id: user.id });
    updateUserObj.email = user.email;

    return await this.updateUserAndInitUserWallet(updateUserObj);
  }

  /**
   * 获取单个用户信息
   */
  async getOneUserInfo(userId: string) {
    const results = await createQueryBuilder(User, 'user')
      .where({ id: userId })
      .leftJoinAndMapMany('user.balanceList', Balance, 'balance', 'balance.userId = user.id')
      .leftJoinAndMapOne('user.userExtend', UserExtend, 'userExtend', 'userExtend.userId = user.id')
      .leftJoinAndMapOne('user.userConfig', UserConfig, 'userConfig', 'userConfig.userId = user.id')
      .leftJoinAndMapMany('user.userCouponList', UserCoupon, 'userCoupon', 'userCoupon.userId = user.id')
      .getOne();
    return results;
  }

  /**
   * 获取用户
   */
  async getUserList(queryParams: IQueryParams) {
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
   * 获取用户条数
   */
  async getUserListCount(filter: JSON) {
    const condition: any = {};
    timeParamsHandle(condition, filter);
    return await this.usersRepository.count(condition);
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
  async createNewUser() {
    const user = new User();
    user.accountType = AccountType.corp_mainland;
    user.userSource = '123456';
    user.password = createSomeDigitNumber(6);
    user.paymentPassword = '123';
    user.nickname = '梁二狗111';
    // user.verifiedName = '梁伟111';
    user.role = RoleEnum.Merchants;
    user.inviteCode = createSomeDigitNumber(6);
    user.phone = createSomeDigitNumber(6);
    user.email = createSomeDigitNumber(6);
    user.id = createSomeDigitNumber(6);

    let userRes: User;
    await this.connection.transaction(async transactionalManager => {
      userRes = await transactionalManager.save(user);
      await this.balanceService.initUserWallet(transactionalManager, userRes.id);
    });

    if (!userRes) throw new CustomException('create user is error', HttpStatus.BAD_REQUEST);

    return userRes;
  }

  /**
   * 创建用户
   */
  async createUser() {
    const user = new User();
    user.accountType = AccountType.corp_mainland;
    user.userSource = '123456';
    user.password = createSomeDigitNumber(6);
    user.paymentPassword = '123';
    user.nickname = '梁二狗';
    // user.verifiedName = '梁伟';
    user.inviteCode = createSomeDigitNumber(6);
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

  /**
   * 更新用户管理人
   */
  async updateUserManageUserId(merchantsId: string, manageId: string) {
    const merchant = await this.usersRepository.findOne({ id: merchantsId });
    if (!merchant) throw new CustomException('user id is Error', HttpStatus.BAD_REQUEST);

    const manager = await this.usersRepository.findOne({ id: manageId });
    if (!manager) throw new CustomException('user id is Error', HttpStatus.BAD_REQUEST);

    merchant.manageUserId = manageId;
    return await this.usersRepository.save(merchant);
  }

  //#region 私有函数

  /**
   * 更新邮箱字段，并且初始化钱包
   */
  private async updateUserAndInitUserWallet(updateUserObj: User) {
    let userRes: User;
    await this.connection.transaction(async transactionalManager => {
      userRes = await transactionalManager.save(updateUserObj);
      await this.balanceService.initUserWallet(transactionalManager, userRes.id);
    });

    if (!userRes) throw new CustomException('create user is error', HttpStatus.BAD_REQUEST);
    return userRes;
  }

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
