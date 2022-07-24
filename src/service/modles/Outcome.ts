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
import { OutcomeModel } from '@/types/outcome';
import { uuid } from '@/utils';

export const Outcome = sequelize.define<OutcomeModel>(
  'outcome',
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
    outComeReason: {
      type: STRING,
      allowNull: false,
    },
    moneyType: STRING(32),
    amount: {
      type: INTEGER,
      allowNull: false,
    },
    outcomeDate: {
      type: DATE,
      allowNull: false,
    },
    outcomeNumber: STRING(9999999),
    remark: STRING(9999999),
    isDelete: BOOLEAN,
  },
  {
    timestamps: true
  }
);

Outcome.sync({
  alter: true
});
