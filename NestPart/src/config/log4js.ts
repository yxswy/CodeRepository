import { resolve } from 'path'
const baseLogPath = resolve(__dirname, '../../logs') //日志要写入哪个目录

const log4jsConfig = {
  appenders: {
    fileout: { type: 'file', filename: `${baseLogPath}/fileout.log` },
    datafileout: {
      type: 'dateFile',
      filename: 'datafileout.log',
      pattern: '.yyyy-MM-dd-hh-mm-ss-SSS',
    },
    consoleout: { type: 'console' },
  },
  categories: {
    default: { appenders: ['fileout', 'consoleout'], level: 'debug' },
    anything: { appenders: ['consoleout'], level: 'debug' },
  },
  //   pm2: true, //使用pm2来管理项目时打开
  //   pm2InstanceVar: 'INSTANCE_ID', // 会根据 pm2 分配的 id 进行区分，以免各进程在写日志时造成冲突
}
export default log4jsConfig
