/*
 * @Author: zhh zhanghaohan@boulderai.com
 * @Date: 2022-07-19 17:42:03
 * @LastEditors: zhh zhanghaohan@boulderai.com
 * @LastEditTime: 2022-07-20 18:43:43
 * @FilePath: \electron-vue3-inote\src\service\modles\Case.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { sequelize } from '../initSequelize';
import { STRING, DATE, BOOLEAN, INTEGER } from 'sequelize';
import { IncomeModel } from '@/types/income';
import { uuid } from '@/utils';

export const Income = sequelize.define<IncomeModel>(
  'income',
  {
    uid: {
      type: STRING,
      primaryKey: true,
      defaultValue: uuid(),
      allowNull: false,
      /**
       * 是否可重复
       */
      unique: true
    },
    caseCode: STRING(32),
    incomeType: STRING(32),
    moneyType: STRING(32),
    amount: {
      type: INTEGER,
      allowNull: false,
    },
    incomeDate: {
      type: DATE,
      allowNull: false,
    },
    custom: STRING(32),
    incomeNumber: STRING(9999999),
    handler: STRING(32),
    remark: STRING(9999999),
    isDelete: BOOLEAN,
  },
  {
    timestamps: true
  }
);

Income.sync({
  alter: true
});
