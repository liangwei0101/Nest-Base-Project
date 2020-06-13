import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getRepository } from 'typeorm';
import { User, AccountType } from '../../entity/user.entity';
import { createSomeDigitNumber } from '../../common/utils/stringUtil';
import { getnowTimeStrStampStr } from '../../common/utils/dateUtil';
import { IPagination, Pagination } from '../../common/specialModules/pagination';
import { createFieldSql, createCompareTimeSql } from '../../common/utils/typeormUtil';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) { }

  /**
   * 获取用户
   */
  async getUserList(pagination: IPagination, filter: any = {}) {
    const inviteCode = filter.inviteCode;
    const startTime = filter.startTime;
    const endTime = filter.endTime;

    const inviteCodeSql = createFieldSql("inviteCode", inviteCode);
    const timeSql = createCompareTimeSql(startTime, endTime);

    const query = getRepository(User)
      .createQueryBuilder('user')
      .andWhere(inviteCodeSql.sqlStr, inviteCodeSql.value)
      .andWhere(timeSql.sqlStr, timeSql.value)
      .take(pagination.limit)
      .skip(pagination.page)
      .orderBy('user.createTime', 'ASC');

    console.log(query.getSql())

    const [results, total] = await query.getManyAndCount();

    return new Pagination<User>({ results, total });
  }

  /**
   * 获取用户
   */
  async findOneByAccount(account: string) {
    return { account: '8888', password: '1', role: 'admin' };
    // return await this.usersRepository.findOne({ where: { account: account } });
  }

  /**
   * 创建用户
   */
  async createUser() {
    const userDto = new User();
    userDto.accountType = AccountType.corp_mainland;
    userDto.userSource = '123456';
    userDto.password = '123123';
    userDto.paymentPassword = '123';
    userDto.nickname = '梁二狗';
    userDto.verifiedName = '梁伟';
    userDto.inviteCode = createSomeDigitNumber(6);
    userDto.phone = '18770919134';
    userDto.email = '272262983@qq.com';
    userDto.id = getnowTimeStrStampStr();
    const user = await this.usersRepository.insert(userDto);
    return user;
  }
}
