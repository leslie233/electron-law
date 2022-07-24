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
export interface CustomModelType {
  uid: string;
  customName: string; // 客户姓名
  caseCode?: string; // 案件编号
  sex?: string; // 性别
  bornTime?: string; // 出生日期
  family?: string; // 民族
  phone?: string; // 联系方式
  email?: string; // 邮箱地址
  address?: string; // 联系地址
  sendCode?: string; // 邮政编码
  remark?: string; // 备注
  isDelete?: boolean;
}

/**
 * 数据库返回的数据类型
 */
export interface DBCustomType {
  readonly uid: string;
  customName: string;
  caseCode?: string;
  sex?: string;
  bornTime?: string;
  family?: string;
  phone?: string;
  email?: string;
  address?: string;
  sendCode?: string;
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
export interface DBCustomListType extends DBCustomType {
  remove?: boolean;
}

/**
 * typescript创建model写法
 * https://stackoverflow.com/questions/60014874/how-to-use-typescript-with-sequelize
 */
export interface CustomModel extends Model<CustomModelType>, CustomModelType {}
