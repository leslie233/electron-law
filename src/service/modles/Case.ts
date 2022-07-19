/*
 * @Author: zhh zhanghaohan@boulderai.com
 * @Date: 2022-07-19 17:42:03
 * @LastEditors: zhh zhanghaohan@boulderai.com
 * @LastEditTime: 2022-07-19 17:47:40
 * @FilePath: \electron-vue3-inote\src\service\modles\Case.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { sequelize } from '../initSequelize';
import { STRING } from 'sequelize';
import { CaseModel } from '@/types/case';
import { uuid } from '@/utils';

export const Case = sequelize.define<CaseModel>(
  'case',
  {
    uid: {
      type: STRING,
      primaryKey: true,
      defaultValue: uuid(),
      allowNull: false,
      /**
       * 是否可重复
       */
      unique: false
    },
    mqconfigName: STRING(32),
    mqconfigState: STRING(9999999),
    mqconfigType: STRING(9999999),
  },
  {
    timestamps: true
  }
);

Case.sync({
  alter: true
});
