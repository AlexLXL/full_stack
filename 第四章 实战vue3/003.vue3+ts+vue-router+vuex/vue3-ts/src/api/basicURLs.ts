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

let dict = { dev, test, prod }
let {normalURL} =  dict[import.meta.env.VITE_RUNNING_ENV]

export let basicURLs =  {
  getImg: normalURL + '/api/sysUser/image'
}