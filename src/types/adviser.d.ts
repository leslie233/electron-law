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
export interface AdviserModelType {
  uid: string;
  companyName: string; // 单位名称
  companyType?: string; // 单位性质
  corporation?: string; // 法人代表
  contracter?: string; // 联系人
  address?: string; // 联系地址
  sendCode?: string; // 邮政编码
  phone?: string; // 联系方式
  email?: string; // 邮箱地址
  fax?: string; // 传真号码
  isUse?: boolean; // 是否有效
  isProxy?: boolean; // 委托代理
  lawer?: string; // 顾问律师
  remark?: string; // 备注
  isDelete?: boolean;
}

/**
 * 数据库返回的数据类型
 */
export interface DBAdviserType {
  readonly uid: string;
  companyName: string;
  companyType?: string;
  corporation?: string;
  contracter?: string;
  address?: string;
  sendCode?: string;
  phone?: string;
  email?: string;
  fax?: string;
  isUse?: boolean;
  isProxy?: boolean;
  lawer?: string;
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
export interface DBAdviserListType extends DBAdviserType {
  remove?: boolean;
}

/**
 * typescript创建model写法
 * https://stackoverflow.com/questions/60014874/how-to-use-typescript-with-sequelize
 */
export interface AdviserModel extends Model<AdviserModelType>, AdviserModelType {}
