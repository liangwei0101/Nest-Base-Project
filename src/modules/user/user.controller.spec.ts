import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, BadRequestException } from '@nestjs/common';
import * as request from 'supertest';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../../entity/user.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../../common/specialModules/auth/constants';
import { LocalStrategy } from '../../common/specialModules/auth/strategies/local.strategy';
import { JwtStrategy } from '../../common/specialModules/auth/strategies/jwt.strategy';
import { AuthService } from '../../common/specialModules/auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { validate } from 'class-validator';
import { CreateUserDto } from './userDto';
import { CustomException } from '../../common/httpHandle/customException';
import { ApiErrorMessage } from '../../common/enum/apiErrorCode';

describe('User Controller', () => {
  const url = '/user';
  let jwtService: JwtService;
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

    jwtService = module.get<JwtService>(JwtService);
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
    const result: User = { id: "1", name: '123', account: "1234", password: "12", role: "admin" };
    jest.spyOn(userService, 'createUser').mockImplementation(async () => result);
    return request(app.getHttpServer())
      .post(url)
      .expect(201)
      .expect(await userService.createUser({ name: '123', account: "1234" }));
  });

  it('Dto is error', async () => {
    const dto = new CreateUserDto()
    dto.account = "1212"
    const errors = await validate(dto);
    expect(errors.length).not.toBe(0);
  });

  afterAll(async () => {
    await app.close();
  });
});
