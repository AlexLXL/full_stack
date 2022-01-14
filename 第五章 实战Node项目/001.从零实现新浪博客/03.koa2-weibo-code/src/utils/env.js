/**
 * @description 环境变量
 * @author 学浪
 */

const NODE_ENV = process.env.NODE_ENV;
const ENVS = {
    'DEV': 'dev',
    'PRD': 'prd',
}

module.exports = {
    NODE_ENV,
    ENVS,
    isDev: NODE_ENV === ENVS.DEV,
    notDev: NODE_ENV !== ENVS.DEV,
    isPrd: NODE_ENV === ENVS.PRD,
    notPrd: NODE_ENV !== ENVS.PRD,
}