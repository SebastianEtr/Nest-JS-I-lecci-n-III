
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from "@nestjs/common";
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';




async function bootstrap() {
  const app = await NestFactory.create(AppModule);


  app.setGlobalPrefix('api');

  app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
      }),
    );

    const config = new DocumentBuilder()
  .setTitle('Products API')
  .setDescription('The products API description')
  .setVersion('1.0')
  .addTag('auth')
  .addBearerAuth()
  .build();
    const document = SwaggerModule.createDocument(app, config);
     SwaggerModule.setup('app', app, document, {
      explorer:true,
      swaggerOptions:{
        filter:true,
        showRequestDuration:true,
      },
     });






  await app.listen(3000);
}
bootstrap();
