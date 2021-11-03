/**
 * 声明文件:
 * 1.让js有语法提示
 *
 * npm i --save-dev @types/jquery 安装jq写好的声明文件
 * 代码会自动查:
 * 1.node_modules模块package.json下的typings字段
 * 2.如果没有,找index.d.ts
 * 3.还是没有,找node_modules的@type的index.d.ts
 * 4.在不安装声明文件时,手动声明
 * 4.1 tsconfig.json修改配置
 *     "moduleResolution": "node",
 *     "baseUrl": ".",
 *     "paths": { "*": [ "*", "types/*"] },
 * 4.2 添加types/index.d.ts文件
 *        declare module "jquery"
 *        declare module "*.png"
 *        declare let myDeclare: string
 *        declare module "myurl" {
 *           export interface Url {
 *               protocol?: string;
 *               hostname?: string;
 *               pathname?: string;
 *           }
 *           export function parse(
 *               urlStr: string,
 *               parseQueryString?: string,
 *               slashesDenoteHost?: string
 *           ): Url;
 *        }
 */
//
import jquery from 'jquery'
import aaa from "a.png"
import * as URL from "myurl"


let result = URL.parse("http://www.typescriptlang.org");
let a: typeof myDeclare = '1'

/**
 *
 * /// 三斜线指令, 表示打包的时候引入这些声明
 * 例: /// <reference path="misc.d.ts">
 *
 */

export default {}