'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.AppDataSource = void 0;
require('reflect-metadata');
const typeorm_1 = require('typeorm');
const User_1 = require('./entity/User');
exports.AppDataSource = new typeorm_1.DataSource({
  type: 'postgres',
  host: 'apolo-dashboard-dev.clhp4ldi6ogd.ap-northeast-2.rds.amazonaws.com',
  port: 5432,
  username: 'postgres',
  password: '43054305',
  database: 'postgres',
  synchronize: true,
  logging: false,
  entities: [User_1.User],
  migrations: [],
  subscribers: [],
});
//# sourceMappingURL=data-source.js.map
