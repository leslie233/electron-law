/*
 * @Author: zhh zhanghaohan@boulderai.com
 * @Date: 2022-07-19 17:43:28
 * @LastEditors: zhh zhanghaohan@boulderai.com
 * @LastEditTime: 2022-07-20 14:49:57
 * @FilePath: \electron-vue3-inote\src\types\case.d.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Model } from 'sequelize';

/**
 * model需要的类型
 */
export interface IncomeModelType {
  uid: string;
  caseCode?: string; // 案件编号
  incomeType?: string; // 收费项目
  moneyType?: string; // 款项类型
  amount: number; // 收费金额
  incomeDate: Date; // 收费时间
  custom?: string; // 委托人
  incomeNumber?: string; // 发票号码
  handler?: Date; // 经手人
  remark?: string; // 备注
  isDelete?: boolean;
}

/**
 * 数据库返回的数据类型
 */
export interface DBIncomeType {
  readonly uid: string;
  caseCode?: string;
  incomeType?: string;
  moneyType?: string;
  amount: number;
  incomeDate: Date;
  custom?: string;
  incomeNumber?: string;
  handler?: Date;
  remark?: string;
  readonly createdAt: Date;
  updatedAt: Date;
  isDelete?: boolean;
}

/**
 * 列表中的
 *
 * remove 是否已删除
 */
export interface DBIncomeListType extends DBIncomeType {
  remove?: boolean;
}

/**
 * typescript创建model写法
 * https://stackoverflow.com/questions/60014874/how-to-use-typescript-with-sequelize
 */
export interface IncomeModel extends Model<IncomeModelType>, IncomeModelType {}
