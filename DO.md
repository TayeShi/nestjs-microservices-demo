# 操作

TODO LIST:

- [x] 创建service_account.proto, service_order.proto
- [x] 编译proto成ts文件
- [ ] 实现account-service
- [ ] 实现order-service
- [ ] 实现gateway-http服务及对account-service, order-service的调用
- [ ] 实现host，nginx代理gateway-http对多个account-service, order-service的调用

## 初始化

创建项目

nest new nestjs-microservices-demo

进入项目

创建gateway-http服务

nest g app account-service

创建account-service服务

nest g app account-service

创建order-service服务

nest g app order-service

创建sub-app后，原来项目根目录下的文件中apps/nestjs-microservices-demo中，删除默认的nestjs-microservices-demo服务

rm -rf apps/nestjs-microservices-demo

删除nest-cli.json中的nestjs-microservices-demo服务

创建 lib/proto 用于保存proto编译的ts文件

nest g lib proto

删除 libs/proto/src下除index.ts外的所有文件

添加proto文件

文件位置:

- proto/service_account.proto
- proto/service_order.proto

项目添加npm包ts-proto

bun add ts-proto

为了方便编译，在package.json的scripts中添加一行proto:build

"proto:build": "protoc --plugin=./node_modules/.bin/protoc-gen-ts_proto --ts_proto_out=./libs/proto/src ./proto/\*.proto --ts_proto_opt=outputEncodeMethods=false,outputJsonMethods=false,outputClientImpl=false,forceLong=number"

执行编译proto为ts文件

bun run proto:build

添加微服务相关的npm

bun add @nestjs/microservices
bun add @grpc/grpc-js
bun add @grpc/proto-loader

启动account-service

```typescript
async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AccountServiceModule,
    {
      transport: Transport.GRPC,
      options: {
        url: '0.0.0.0:' + '8011',
        package: 'service_account',
        protoPath: join(
          __dirname,
          process.env.NODE_ENV === 'dev'
            ? '../../../proto/service_account.proto'
            : 'proto/service_account.proto',
        ),
      },
    },
  );
  await app.listen();

  logger.debug('account-service start');
}
void bootstrap();
```

给package.json的start:dev中添加环境变量`cross-env NODE_ENV=dev`

启动运行grpc服务account-service

bun run start:dev account-service

分别实现account-service, order-service的逻辑且运行
