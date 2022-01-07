let dev = {
  normalURL: 'http://42.193.158.170:8098',
  iotURL: 'http://42.193.158.170:8098/iot_test',
  woURL: 'http://42.193.158.170:8098/wo_server_test',
  authURL: 'http://42.193.158.170:8098/psgs_auth_server_test',
  safeProdURL: 'http://42.193.158.170:8098/safeprod_test',
  pumpUrl: 'http://42.193.158.170:8098/gwxj_test',
  aeURL: 'http://42.193.158.170:8098/testPsgsDuAe'
}

let test = {
  normalURL: 'http://42.193.158.170:8098',
  iotURL: 'http://42.193.158.170:8098/iot_test',
  woURL: 'http://42.193.158.170:8098/wo_server_test',
  authURL: 'http://42.193.158.170:8098/psgs_auth_server_test',
  safeProdURL: 'http://42.193.158.170:8098/safeprod_test',
  pumpUrl: 'http://42.193.158.170:8098/gwxj_test',
  aeURL: 'http://42.193.158.170:8098/testPsgsDuAe'
}

let prod = {
  normalURL: 'http://42.193.158.170:8098',
  iotURL: 'http://42.193.158.170:8098/iot_test',
  woURL: 'http://42.193.158.170:8098/wo_server_test',
  authURL: 'http://42.193.158.170:8098/psgs_auth_server_test',
  safeProdURL: 'http://42.193.158.170:8098/safeprod_test',
  pumpUrl: 'http://42.193.158.170:8098/gwxj_test',
  aeURL: 'http://42.193.158.170:8098/testPsgsDuAe'
}

// @ts-ignore
let RUNNING_ENV = { dev, test, prod }[import.meta.env.VITE_RUNNING_ENV]

export const normalURL =  RUNNING_ENV.normalURL
export const iotURL =  RUNNING_ENV.iotURL
export const woURL =  RUNNING_ENV.woURL
export const authURL =  RUNNING_ENV.authURL
export const safeProdURL =  RUNNING_ENV.safeProdURL
export const pumpUrl =  RUNNING_ENV.pumpUrl
export const aeURL =  RUNNING_ENV.aeURL