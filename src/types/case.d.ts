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
export interface CaseModelType {
  uid: string;
  caseCode: string; // 案件编号
  caseType?: string; // 案件类型
  caseReason?: string; // 案由
  client?: string; // 委托人
  parties?: string; // 对方当事人
  thirdPerson?: string; // 第三人
  caseAmount?: number; // 诉讼标的
  casePrice?: number; // 代理费用
  payDate?: Date; // 收费日期
  caseDate?: Date; // 受理日期
  openDate:? Date; // 开庭日期
  caseLevel?: string; // 审级
  isSaveMoney?: boolean; // 是否需要财产保全
  isSaveProof?: boolean; // 是否需要证据保全
  courthouse?: string; // 受理法院
  judge?: string; // 主审法官
  proofDate?: Date; // 举证期限
  transactors?: string; // 承办人
  lawer?: string; // 合办律师
  source?: string; // 案件来源
  remark?: string; // 备注
}

/**
 * 数据库返回的数据类型
 */
export interface DBCaseType {
  readonly uid: string;
  caseCode: string;
  caseType?: string;
  caseReason?: string;
  client?: string;
  parties?: string;
  thirdPerson?: string;
  caseAmount?: number;
  casePrice?: number;
  payDate?: Date;
  caseDate?: Date;
  openDate?: Date;
  caseLevel?: string;
  isSaveMoney?: boolean;
  isSaveProof?: boolean;
  courthouse?: string;
  judge?: string;
  proofDate?: Date;
  transactors?: string;
  lawer?: string;
  source?: string;
  remark?: string;
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
