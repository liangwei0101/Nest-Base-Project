import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../entity/user.entity';
import { AuthModule } from '../../common/auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../../common/auth/constants';
import { LocalStrategy } from '../../common/auth/strategies/local.strategy';
import { JwtStrategy } from '../../common/auth/strategies/jwt.strategy';
import { AuthService } from '../../common/auth/auth.service';
import { JwtService } from '@nestjs/jwt';

describe('User Controller', () => {
  const url = '/user';
  let app: INestApplication;
  let userService: UserService;
  let userController: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        PassportModule,
        JwtModule.register({
          secret: jwtConstants.secret,
          signOptions: { expiresIn: '24h' },
        }),
      ],
      controllers: [UserController],
      providers: [
        AuthService,
        LocalStrategy,
        JwtStrategy,
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
    const result: User = { id: "1", name: '123', account: "1234", password: "12", role: 0 };

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
