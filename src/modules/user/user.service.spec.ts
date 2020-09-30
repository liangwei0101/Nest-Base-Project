import { Repository } from 'typeorm';
import { UserService } from './user.service';
import { User } from '../../entity/user/user.entity';
import { TestingModule, Test } from '@nestjs/testing';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from '../../common/special-modules/database/database.module';
import { INestApplication } from '@nestjs/common';

// export async function createConnect() {
//   return createConnection({
//     // name, // let TypeORM manage the connections
//     type: 'postgres',
//     database: 'postgres',
//     logging: false,
//     username: 'postgres',
//     password: 'postgres',
//   });
// }

// const user = {
//   id: '2020-0620-1525-45106',
//   createTime: '2020-06-20T07:25:45.116Z',
//   updateTime: '2020-06-20T07:25:45.116Z',
//   phone: '18770919134',
//   locked: false,
//   role: '300',
//   nickname: '梁二狗',
//   verifiedName: '梁伟',
//   email: '272262983@qq.com',
//   inviteCode: '538003',
//   inviteId: null,
//   manageUserId: null,
//   accountType: 'corp_mainland',
//   userSource: '123456',
//   signUpProgress: 1,
//   remarks: null,
// };

// const userArray = [[user], 1];

describe('UserService', () => {
  // let db: Connection;
  let app: INestApplication;
  let service: UserService;
  let repo: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule, TypeOrmModule.forFeature([User])],
      providers: [UserService],
    }).compile();

    service = module.get<UserService>(UserService);
    repo = module.get<Repository<User>>(getRepositoryToken(User));
    app = module.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('createUser', () => {
    it('createUser', async () => {
      const user = await service.createUser();
      expect(user.name).toEqual('梁二狗');
      await repo.remove(user);
    });
  });

  describe('getUserList', () => {
    it('分页', async () => {
      const page = { page: 0, limit: 10 };
      const user = await service.createUser();
      const res = await service.getUserList(page);
      expect(res.count).toEqual(1);
      expect(res.list[0]).toEqual(user.id);
      await repo.remove(user);
    });
    // it('分页', async () => {
    //   const page = { page: null, limit: null };
    //   const res = await service.getUserList(page);
    //   expect(res.total).toEqual(1);
    // });
    // it('条件', async () => {
    //   const page = { page: 0, limit: 10 };
    //   const filter = { createTime: [new Date(), new Date()], updateTime: [new Date(), new Date()] };
    //   const res = await service.getUserList(page, filter);
    //   expect(res.total).toBeGreaterThanOrEqual(0);
    // });
  });

  // it('updateUserInfo', async () => {
  //   // const updateUser = new User();
  //   // updateUser.nickname = '111';
  //   // const user = await service.updateUserInfo(updateUser);
  //   expect(user.nickname).toEqual('111');
  // });

  // it('findOneByAccount', async () => {
  //   const use = await service.findOneByAccount('121221');
  //   expect(user.phone).toEqual('18770919134');
  // });

  // it('findOneByAccountAndPasswd', async () => {
  //   const user = await service.findOneByAccountAndPasswd(null, null);
  //   expect(user.phone).toEqual('18770919134');
  // });
});
