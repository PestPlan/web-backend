import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule, { cors: true });
    /**
     * whitelist: If set to true, validator will strip validated (returned) object of any properties that do not use any validation decorators.
     * forbidNonWhitelisted: If set to true, instead of stripping non-whitelisted properties validator will throw an exception.
     * validationError.target: Indicates if target should be exposed in ValidationError.
     * validationError.value: Indicates if validated value should be exposed in ValidationError.
     */
    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
            whitelist: true,
            forbidNonWhitelisted: true,
            validationError: {
                target: true,
                value: true,
            },
        }),
    );
    process.on('uncaughtException', (err) => {
        Logger.warn(err, 'LOGGER', false);
    });
    app.listen(process.env.PORT || 3333, '0.0.0.0', () => {
        Logger.warn(`server listening on port: ${process.env.PORT}`);
    });
}
bootstrap();
