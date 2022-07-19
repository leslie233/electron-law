/*
 * @Author: zhh zhanghaohan@boulderai.com
 * @Date: 2022-07-19 17:43:28
 * @LastEditors: zhh zhanghaohan@boulderai.com
 * @LastEditTime: 2022-07-19 17:46:32
 * @FilePath: \electron-vue3-inote\src\types\case.d.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Model } from 'sequelize';

/**
 * model需要的类型
 */
export interface CaseModelType {
  uid: string;
  mqconfigName: string;
  mqconfigState: string;
  mqconfigType: string;
}

/**
 * 数据库返回的数据类型
 */
export interface DBCaseType {
  readonly uid: string;
  mqconfigName: string;
  mqconfigState: string;
  mqconfigType: string;
  readonly createdAt: Date;
  updatedAt: Date;
}

/**
 * 列表中的
 *
 * remove 是否已删除
 */
export interface DBCaseListType extends DBCaseType {
  remove?: boolean;
}

/**
 * typescript创建model写法
 * https://stackoverflow.com/questions/60014874/how-to-use-typescript-with-sequelize
 */
export interface CaseModel extends Model<CaseModelType>, CaseModelType {}
