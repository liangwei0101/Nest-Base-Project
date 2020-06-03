import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../../entity/user.entity';

describe('UserService', () => {
  let userService: UserService;

  beforeEach(async () => {
    
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            getUserList: async () => Promise.resolve([]),
            createUser: async () => Promise.resolve({})
          },
        },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
  });

  it('获取用户列表', async () => {
    const result = [];
    const userList = await userService.getUserList();
    expect(userList.length).toBe(result.length);
  });

  it('创建用户', async () => {
    const result = { name: '123', account: "1234" };
    const user = await userService.createUser(result);
    expect(user.name).toBe(result.name);
  });

});
