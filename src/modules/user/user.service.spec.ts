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

const user = new User();
user.name = '梁二狗';
user.email = '272262983@qq.com';
user.remarks = 'remarks';
user.roleNo = '300';
user.locked = false;
user.phone = '18770919134';
export { user };

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
      const res = await service.getUserList(null);
      expect(res.pageTotal).toBeGreaterThan(1);
      expect(res.data[0].id).toEqual(user.id);
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
