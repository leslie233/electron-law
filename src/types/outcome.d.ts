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
export interface OutcomeModelType {
  uid: string;
  outComeReason: string; // 支出原因
  moneyType?: string; // 款项类型
  amount: number; // 支出金额
  outcomeDate: Date; // 支出时间
  outcomeNumber?: string; // 发票号码
  remark?: string; // 备注
  isDelete?: boolean;
}

/**
 * 数据库返回的数据类型
 */
export interface DBOutcomeType {
  readonly uid: string;
  outComeReason: string;
  moneyType?: string;
  amount: number;
  outcomeDate: Date;
  outcomeNumber?: string;
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
export interface DBOutcomeListType extends DBOutcomeType {
  remove?: boolean;
}

/**
 * typescript创建model写法
 * https://stackoverflow.com/questions/60014874/how-to-use-typescript-with-sequelize
 */
export interface OutcomeModel extends Model<OutcomeModelType>, OutcomeModelType {}
