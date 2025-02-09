import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Ignora propiedades no definidas en el DTO
      forbidNonWhitelisted: true, // Prohíbe propiedades adicionales no definidas en el DTO
      transform: true, // Convierte automáticamente los datos de entrada al tipo especificado en el DTO
      validationError: { target: false }, // No incluye el objeto completo en los errores de validación
    }),
  );

  await app.listen(8080);
}
bootstrap();
