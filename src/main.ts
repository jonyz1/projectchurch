import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerDocumentOptions, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config= new DocumentBuilder()
  .setTitle("church app")
  .setDescription("a student instructure api for local church")
  .setVersion("1.0")
  .addTag("church")
  .build();
  // const option:SwaggerDocumentOptions={
  //   operationIdFactory:(controllerkey:string,methodekey:string)=>controllerkey
  // }
  const document= SwaggerModule.createDocument(app,config)
  SwaggerModule.setup("api",app,document)
  await app.listen(process.env.port||3000);
}
bootstrap();
