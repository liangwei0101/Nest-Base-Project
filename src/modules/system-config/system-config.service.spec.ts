import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SystemConfig } from '../../entity/configs/system.config.entity';
import { DatabaseModule } from '../../common/special-modules/database/database.module';
import { SystemConfigService } from './system-config.service';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IQueryParams } from '../../common/interface/IQueryParams';
import { ActiveEnum } from '../../common/enum/common.enum';

const list = [
  {
    _id: '5f3a949bd6b521431c20e8af',
    name: 'qbitcard_Configs',
    type: 'qbitCard',
    value:
      '[{"qbitCard_segment":"556305","qbitCard_association":"MasterCard","qbitCard_partner":"pennyCard","qbitCard_type":"Credit","qbitCard_avs":"是","qbitCard_status":"available"},{"qbitCard_segment":"485913","qbitCard_association":"Visa","qbitCard_partner":"paycertifyCard","qbitCard_type":"Credit","qbitCard_avs":"否","qbitCard_attention":"此卡段交易记录暂时同步较慢约需要2个工作日,此卡段暂不支持绑定Facebook验证","qbitCard_status":"available"},{"qbitCard_segment":"476771","qbitCard_association":"Visa","qbitCard_partner":"privacyCard","qbitCard_type":"Dredit","qbitCard_avs":"是","qbitCard_status":"unavailable"}]',
    remarks: '量子卡合作方详情',
    createdAt: '1970-01-01T00:00:00.000Z',
    visibleToUser: true,
  },
  {
    _id: '5f339d259e6e1f26e4f22b75',
    name: 'qbit_account_first_min_deposit_amount',
    remarks: '量子账户首次最小充值数',
    type: 'qbitCard',
    value: 100,
    createdAt: '2020-03-03T03:44:14.971Z',
    updatedAt: '2020-03-03T03:44:14.971Z',
    visibleToUser: true,
    __v: 0,
  },
  {
    _id: '5f296687cd5816d3d91442c8',
    name: 'invite_code_white_list',
    value: '1802',
    type: 'qbitCard',
    remarks: '9月1日前开户可获得量子账户充值费率优惠的邀请码列表，使用半角逗号分隔',
    createdAt: '2020-08-04T00:00:00.000Z',
    updatedAt: '2020-08-04T00:00:00.000Z',
    visibleToUser: false,
    __v: 0,
  },
  {
    _id: '5f06b1f6ab2852138066942f',
    name: 'individual_qbit_card_max_free_amount',
    remarks: '个人量子卡免费数量',
    type: 'qbitCard',
    visibleToUser: true,
    value: 10,
    createdAt: '2020-03-03T03:44:14.971Z',
    updatedAt: '2020-03-03T03:44:14.971Z',
    __v: 0,
  },
  {
    _id: '5f06b1f6ab2852138066942e',
    name: 'corp_qbit_card_max_free_amount',
    type: 'qbitCard',
    remarks: '企业量子卡免费数量',
    visibleToUser: true,
    value: 10,
    createdAt: '2020-03-03T03:44:14.971Z',
    updatedAt: '2020-03-03T03:44:14.971Z',
    __v: 0,
  },
  {
    _id: '5ec0cbfbd4e96731b003a90b',
    name: 'qbit_card_min_deposit_amount',
    type: 'qbitCard',
    remarks: '量子卡最小充值数',
    visibleToUser: true,
    value: 10,
    createdAt: '2020-03-03T03:44:14.971Z',
    updatedAt: '2020-03-03T03:44:14.971Z',
    __v: 0,
  },
  {
    _id: '5ec0cbe9d4e96731b003a833',
    name: 'qbit_account_min_deposit_amount',
    type: 'qbitCard',
    remarks: '量子账户最小充值数',
    visibleToUser: true,
    value: 1000,
    createdAt: '2020-03-03T03:44:14.971Z',
    updatedAt: '2020-03-03T03:44:14.971Z',
    __v: 0,
  },
  {
    _id: '5ec0cb98d4e96731b003a460',
    name: 'qbit_account_deposit_fee',
    remarks: '量子账户充值费用（默认）',
    visibleToUser: true,
    type: 'qbitCard',
    value: 0.02,
    createdAt: '2020-03-03T03:44:14.971Z',
    updatedAt: '2020-03-03T03:44:14.971Z',
    __v: 0,
  },
  {
    _id: '5ec0cb7bd4e96731b003a333',
    name: 'qbit_new_card_fee',
    remarks: '量子卡开卡费用（默认）',
    visibleToUser: true,
    type: 'qbitCard',
    value: 1,
    createdAt: '2020-03-03T03:44:14.971Z',
    updatedAt: '2020-03-03T03:44:14.971Z',
    __v: 0,
  },
  {
    _id: '5f240b6440e1a44fc08ccef3',
    name: 'red_envelope_period_of_validity',
    remarks: '红包默认有效期(天)',
    visibleToUser: false,
    type: 'coupon',
    value: 10,
    __v: 0,
    createdAt: '2020-07-02T05:47:58.661Z',
    updatedAt: '2020-07-02T05:47:58.661Z',
  },
  {
    _id: '5f240b6440e1a44fc08ccef2',
    name: 'success_deposit_kyb_reward',
    type: 'coupon',
    visibleToUser: true,
    value: 10,
    remarks: '完成充值Kyb的10usd红包奖励',
    createdAt: '2019-10-17T04:11:23.531Z',
    updatedAt: '2019-11-20T09:09:46.190Z',
    __v: 0,
  },
  {
    _id: '5dd65275bfa0240349649969',
    name: 'success_kyc_reward',
    visibleToUser: true,
    type: 'coupon',
    value: 10,
    remarks: '实名制审核10usd红包奖励',
    createdAt: '2019-10-17T04:11:23.531Z',
    updatedAt: '2019-11-20T09:09:46.190Z',
    __v: 0,
  },
  {
    _id: '5f240b6440e1a44fc08ccef1',
    name: 'usd_fx_trade_fee',
    remarks: 'usd换汇服务费',
    type: 'fxOrPayment',
    visibleToUser: true,
    value: 0.003,
    createdAt: '2020-03-03T03:44:14.971Z',
    updatedAt: '2020-03-03T03:44:14.971Z',
    __v: 0,
  },
  {
    _id: '5e71bd1f840c3380dc06aa38',
    name: 'eur_fx_trade_fee',
    remarks: '欧元换汇服务费',
    visibleToUser: true,
    type: 'fxOrPayment',
    value: 0.005,
    createdAt: '2020-03-03T03:44:14.971Z',
    updatedAt: '2020-03-03T03:44:14.971Z',
    __v: 0,
  },
  {
    _id: '5e68d08b476e683f356a1400',
    name: 'fast_fx_trade_fee',
    remarks: '急速换汇服务费',
    type: 'fxOrPayment',
    visibleToUser: true,
    value: 0.005,
    createdAt: '2020-03-03T03:44:14.971Z',
    updatedAt: '2020-03-03T03:44:14.971Z',
    __v: 0,
  },
  {
    _id: '5e68d08b476e683f356a13ff',
    name: 'user_current_day_fast_fx_trade_Limit',
    remarks: '用户当天急速换汇限额',
    visibleToUser: true,
    type: 'fxOrPayment',
    value: 20000,
    createdAt: '2020-03-03T03:44:14.971Z',
    updatedAt: '2020-03-03T03:44:14.971Z',
    __v: 0,
  },
  {
    _id: '5e68d08b476e683f356a13fe',
    name: 'system_current_day_fast_fx_limit',
    remarks: '系统当天急速换汇限额',
    visibleToUser: true,
    type: 'fxOrPayment',
    value: 300000,
    createdAt: '2020-03-03T03:44:14.971Z',
    updatedAt: '2020-03-03T03:44:14.971Z',
    __v: 0,
  },
  {
    _id: '5e2434a65f40791888022a8a',
    name: 'batch_trade_single_fee',
    visibleToUser: true,
    type: 'fxOrPayment',
    value: 5,
    remarks: '单次批量付款收费5￥',
    createdAt: '2019-10-17T04:11:23.531Z',
    updatedAt: '2019-11-20T09:09:46.190Z',
    __v: 0,
  },
];

describe('SystemConfigService', () => {
  let service: SystemConfigService;
  let repo: Repository<SystemConfig>;
  let app: INestApplication;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule, TypeOrmModule.forFeature([SystemConfig])],
      providers: [
        SystemConfigService,
        {
          provide: SystemConfig,
          useClass: Repository,
        },
      ],
    }).compile();

    app = module.createNestApplication();
    await app.init();

    service = module.get<SystemConfigService>(SystemConfigService);
    repo = module.get<Repository<SystemConfig>>(getRepositoryToken(SystemConfig));
  });

  describe('systemConfigList', () => {
    it('创建', async () => {
      const addList: SystemConfig[] = [];
      for (const obj of list) {
        const systemConfig = new SystemConfig();
        systemConfig.key = obj.name;
        systemConfig.value = obj.value.toString();
        systemConfig.type = obj.type;
        systemConfig.remarks = obj.remarks;
        systemConfig.status = ActiveEnum.active;
        systemConfig.visibleToUser = obj.visibleToUser;

        const systemConfigObj = await repo.findOne({ key: obj.name });
        if (!systemConfigObj) {
          addList.push(systemConfig);
        }
      }
      repo.save(addList);
      const dbList = await repo.find();
      expect(dbList.length).toBeLessThanOrEqual(list.length);
    });

    it('正常参数', async () => {
      const params: IQueryParams = {
        order: {},
        filter: {},
        pagination: { limit: 10, page: 0 },
      };
      const res = await service.systemConfigList(params);
      expect(res.data.length).toEqual(res.pageTotal);
      expect(res.pageTotal).toBeGreaterThanOrEqual(0);
      expect(res.total).toBeGreaterThanOrEqual(res.pageTotal);

      const obj = res.data.find(s => s.visibleToUser === false);
      expect(obj).toBeUndefined();
    });

    it('参数0', async () => {
      const params: IQueryParams = {
        order: {},
        filter: { id: 1 },
        pagination: { limit: 10, page: 0 },
      };
      const res = await service.systemConfigList(params);
      expect(res.data.length).toEqual(res.pageTotal);
      expect(res.pageTotal).toBeGreaterThanOrEqual(0);
      expect(res.total).toBeGreaterThanOrEqual(res.pageTotal);
    });

    it('参数1', async () => {
      const params: IQueryParams = {
        order: { createTime: 1 },
        filter: {},
        pagination: { limit: 10, page: 0 },
      };
      const res = await service.systemConfigList(params);
      expect(res.data.length).toEqual(res.pageTotal);
      expect(res.pageTotal).toBeGreaterThanOrEqual(0);
      expect(res.total).toBeGreaterThanOrEqual(res.pageTotal);
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
