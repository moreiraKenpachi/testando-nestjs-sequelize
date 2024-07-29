import { SequelizeModuleOptions } from '@nestjs/sequelize';
import { User } from './users/entities/user.entity';

export const config: SequelizeModuleOptions = {
  dialect: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'admin',
  database: 'testando-nestjs-sequelize',
  models: [User],
  standardConformingStrings: true,
  autoLoadModels: true,
  synchronize: true,
  logging: true,
};
