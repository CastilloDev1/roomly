import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from '../modules/users/entities/user.entity';

export const typeOrmConfig = (configService: ConfigService): TypeOrmModuleOptions => ({
    type: 'postgres',
    host: configService.get<string>('config.database.host'),
    port: configService.get<number>('config.database.port'),
    username: configService.get<string>('config.database.user'),
    password: configService.get<string>('config.database.password'),
    database: configService.get<string>('config.database.name'),
    entities: [User],
    synchronize: true,
    logging: false,
});