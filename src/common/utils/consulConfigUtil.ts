const Consul = require('consul');

export class ConsulConfig {
	private consul: any;

	constructor() {
		const serviceName = 'core-service';

		// 初始化 consul
		this.consul = new Consul({
			host: '127.0.0.1',
			port: 8500,
			promisify: true,
		});

		// 服务注册与健康检查配置
		this.consul.agent.service.register({
			id: 'core-1',
			name: serviceName,
			address: 'localhost', // 注册中心地址
			port: 3000, // 注册中心请求健康检查的端口
			check: {
				http: 'http://127.0.0.1:3000/health',
				interval: '10s',
				timeout: '5s',
			}
		}, function (err: any) {
			if (err) {
				console.error(err);
				throw err;
			}

			console.log(serviceName + '：注册成功！');
		})
	}
}