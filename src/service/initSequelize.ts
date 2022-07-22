/*
 * @Author: zhh zhanghaohan@boulderai.com
 * @Date: 2022-07-19 11:39:16
 * @LastEditors: zhh zhanghaohan@boulderai.com
 * @LastEditTime: 2022-07-22 15:27:56
 * @FilePath: \electron-vue3-inote\src\service\initSequelize.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Sequelize } from 'sequelize';
import sqlite3 from 'sqlite3';
import { join } from 'path';
import { remote } from 'electron';
import { constStoragePath } from '@/config';

const storagePath = join(remote.app.getPath('userData'), constStoragePath);

export const sequelize = new Sequelize({
  database: 'reading',
  dialect: 'sqlite',
  storage: storagePath,
  dialectModule: sqlite3,
  logging: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

export const sequelizeInit = (): void => {
  console.log('-----------------------------------------------------------------');
  sequelize
    .authenticate()
    .then(() => {
      // console.clear();
      console.log('Connection has been established successfully.');
    })
    .catch(err => {
      console.log('Unable to connect to the database', err);
    });

  // 根据 model自动创建表
  sequelize
    .sync()
    .then(() => {
      console.log('init db ok');
    })
    .catch(err => {
      console.log('init db error', err);
    });
};

  // @ts-ignore # 忽视本行代码的小错误
  export const Op = Sequelize.Op;
