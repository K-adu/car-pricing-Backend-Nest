import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      //only whitelist properties are in the request and other are ignored
      whitelist: true,
    }),
  );
  await app.listen(3000);
}
bootstrap();
