/*
 * @Author: zhh zhanghaohan@boulderai.com
 * @Date: 2022-07-19 17:42:03
 * @LastEditors: zhh zhanghaohan@boulderai.com
 * @LastEditTime: 2022-07-20 18:43:43
 * @FilePath: \electron-vue3-inote\src\service\modles\Case.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { sequelize } from '../initSequelize';
import { STRING, DATE, BOOLEAN } from 'sequelize';
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
    caseCode: {
      type: STRING,
      allowNull: false,
      unique: false,
    },
    caseType: STRING(32),
    caseReason: STRING(9999999),
    client: STRING(32),
    parties: STRING(32),
    thirdPerson: STRING(32),
    caseAmount: STRING(32),
    casePrice: STRING(32),
    payDate: DATE,
    caseDate: DATE,
    openDate: DATE,
    caseLevel: STRING(32),
    isSaveMoney: BOOLEAN,
    isSaveProof: BOOLEAN,
    courthouse: STRING(32),
    judge: STRING(32),
    proofDate: DATE,
    transactors: STRING(32),
    lawer: STRING(32),
    source: STRING(32),
    remark: STRING(9999999),
  },
  {
    timestamps: true
  }
);

Case.sync({
  alter: true
});
