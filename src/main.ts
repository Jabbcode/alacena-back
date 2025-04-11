import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api/v1');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Ignora propiedades no definidas en el DTO
      forbidNonWhitelisted: true, // Prohíbe propiedades adicionales no definidas en el DTO
      transform: true, // Convierte automáticamente los datos de entrada al tipo especificado en el DTO
      validationError: { target: false }, // No incluye el objeto completo en los errores de validación
    }),
  );

  const corsOptions: CorsOptions = {
    origin: ['http://localhost:5173', 'https://alacena-front.onrender.com'], // Permite orígenes específicos
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'], // Métodos HTTP permitidos
    allowedHeaders: ['Content-Type', 'Authorization'], // Encabezados permitidos
    credentials: true, // Habilita el envío de credenciales (cookies, autenticación, etc.)
  };

  app.enableCors(corsOptions);

  await app.listen(process.env.PORT);
}
bootstrap();
