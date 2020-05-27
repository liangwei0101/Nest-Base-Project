import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from './user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('User Controller', () => {
  const url = '/user';
  let app: INestApplication;
  let userService: UserService;
  let userController: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            getUserList: async () => Promise.resolve([]),
            createUser: async () => Promise.resolve({})
          },
        },
      ],
    }).compile();

    app = module.createNestApplication();
    await app.init();

    userService = module.get<UserService>(UserService);
    userController = module.get<UserController>(UserController);
  });

  it('user get', async () => {
    const result: User[] = [];

    jest.spyOn(userService, 'getUserList').mockImplementation(async () => result);

    return request(app.getHttpServer())
      .get(url)
      .expect(200)
      .expect(await userService.getUserList());
  });

  it('user post', async () => {
    const result: User = { id: "1", name: '123', account: "1234", password: "12" };

    jest.spyOn(userService, 'createUser').mockImplementation(async () => result);
    return request(app.getHttpServer())
      .post(url)
      .send(result)
      .expect(201)
      .expect(await userService.createUser({ name: '123', account: "1234" }));
  });

  it('user post error', () => {
    return request(app.getHttpServer())
      .post('/user')
      .send({ account: '1234' })
      .expect(201)
      .expect({
        statusCode: 400,
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
